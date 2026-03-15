import Iter "mo:core/Iter";
import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Time "mo:core/Time";
import Order "mo:core/Order";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import Timestamp "mo:core/Time";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  let applications = Map.empty<Nat, LoanApplication>();
  var nextId = 0;

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  public type UserProfile = {
    name : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  type LoanStatus = {
    #pending;
    #approved;
    #rejected;
  };

  module LoanStatus {
    public func compare(status1 : LoanStatus, status2 : LoanStatus) : Order.Order {
      switch (status1, status2) {
        case (#pending, #pending) { #equal };
        case (#approved, #approved) { #equal };
        case (#rejected, #rejected) { #equal };
        case (#pending, _) { #less };
        case (#approved, #pending) { #greater };
        case (#approved, #rejected) { #less };
        case (#rejected, _) { #greater };
      };
    };
  };

  type LoanApplication = {
    id : Nat;
    fullName : Text;
    email : Text;
    whatsApp : Text;
    amount : Nat;
    term : Nat;
    interestRate : Nat;
    submittedAt : Timestamp.Time;
    status : LoanStatus;
  };

  let interestRates : [(Nat, Nat)] = [
    (500, 5),
    (5000, 8),
    (10000, 12),
  ];

  func calculateInterestRate(amount : Nat) : Nat {
    for ((threshold, rate) in interestRates.values()) {
      if (amount <= threshold) {
        return rate;
      };
    };
    15;
  };

  func validateTerm(term : Nat) : () {
    if (term != 6 and term != 12 and term != 24 and term != 36) {
      Runtime.trap("Invalid loan term. Must be 6, 12, 24, or 36 months");
    };
  };

  func validateAmount(amount : Nat) : () {
    if (amount < 500 or amount > 10000) {
      Runtime.trap("Invalid loan amount. Must be between 500 and 10000");
    };
  };

  public shared ({ caller }) func submitApplication(fullName : Text, email : Text, whatsApp : Text, amount : Nat, term : Nat) : async Nat {
    validateAmount(amount);
    validateTerm(term);

    let application : LoanApplication = {
      id = nextId;
      fullName;
      email;
      whatsApp;
      amount;
      term;
      interestRate = calculateInterestRate(amount);
      submittedAt = Time.now();
      status = #pending;
    };

    applications.add(nextId, application);
    nextId += 1;
    application.id;
  };

  public query ({ caller }) func getAllApplications() : async [LoanApplication] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can retrieve all applications");
    };
    applications.values().toArray();
  };

  public query ({ caller }) func getApplicationCount() : async Nat {
    applications.size();
  };

  public shared ({ caller }) func updateApplicationStatus(id : Nat, status : LoanStatus) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can update application status");
    };
    switch (applications.get(id)) {
      case (null) { Runtime.trap("Application not found") };
      case (?application) {
        let updatedApplication = { application with status };
        applications.add(id, updatedApplication);
      };
    };
  };

  public query ({ caller }) func getApplicationStatus(id : Nat) : async LoanStatus {
    switch (applications.get(id)) {
      case (null) { Runtime.trap("Application not found") };
      case (?application) { application.status };
    };
  };
};
