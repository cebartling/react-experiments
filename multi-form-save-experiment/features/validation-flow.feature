Feature: Validation Flow
  As a user with multiple forms on a page
  I want validation to be triggered when I save
  So that I can see and fix errors before data is submitted

  Background:
    Given I am on the dirty state demo page

  Scenario: Save button triggers validation on dirty forms
    When I type "x" in the name field
    And I click the save all button
    Then I should see an error summary
    And the error summary should include "User Information"

  Scenario: Clean forms are not validated
    When I type "John" in the name field
    And I type "john@example.com" in the email field
    And I click the save all button
    Then I should not see an error summary
    And the status should show "All saved"

  Scenario: Multiple forms with errors show all validation failures
    When I type "x" in the name field
    And I type "x" in the street field
    And I click the save all button
    Then I should see an error summary
    And the error summary should include "User Information"
    And the error summary should include "Address"

  Scenario: Valid form data passes validation and saves
    When I type "John Doe" in the name field
    And I type "john@example.com" in the email field
    And I click the save all button
    Then the save button should be disabled
    And the status should show "All saved"

  Scenario: Inline validation errors are shown in each form
    When I type "x" in the name field
    And I click the save all button
    Then I should see an inline error for "email"

  Scenario: Fixing validation errors allows save to proceed
    When I type "x" in the name field
    And I click the save all button
    Then I should see an error summary
    When I clear the name field
    And I type "John Doe" in the name field
    And I type "john@example.com" in the email field
    And I click the save all button
    Then I should not see an error summary
    And the status should show "All saved"

  Scenario: Only dirty forms are validated
    When I type "John Doe" in the name field
    And I type "john@example.com" in the email field
    And I click the save all button
    Then I should not see an error summary
    And the save button should be disabled

  Scenario: Email validation shows error for invalid email
    When I type "John" in the name field
    And I type "invalid-email" in the email field
    And I click the save all button
    Then I should see an inline error for "email"
    And the error summary should include "User Information"
