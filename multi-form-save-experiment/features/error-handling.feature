Feature: Error Handling
  As a user with multiple forms on a page
  I want clear error messages when validation or submission fails
  So that I can understand and fix the issues

  Background:
    Given I am on the dirty state demo page

  Scenario: Validation errors prevent form submission (AC4.1)
    When I type "x" in the name field
    And I click the save all button
    Then I should see an error summary
    And the status should show "Validation failed"
    And the save button should be enabled

  Scenario: Error summary displays when validation fails (AC4.2)
    When I type "invalid" in the name field
    And I click the save all button
    Then I should see an error summary
    And the error summary should contain at least one form error

  Scenario: Error summary identifies which forms failed (AC4.3)
    When I type "x" in the name field
    And I click the save all button
    Then I should see an error summary
    And the error summary should include "User Information"

  Scenario: Multiple form errors are listed in summary (AC4.3)
    When I type "x" in the name field
    And I type "x" in the street field
    And I click the save all button
    Then I should see an error summary
    And the error summary should include "User Information"
    And the error summary should include "Address"

  Scenario: Field-level errors are displayed inline (AC4.5)
    When I type "x" in the name field
    And I click the save all button
    Then I should see an inline error for "email"

  Scenario: Invalid fields are visually highlighted (AC4.6)
    When I type "invalid-email" in the email field
    And I type "John" in the name field
    And I click the save all button
    Then I should see an inline error for "email"
    And the email field should have an error indicator

  Scenario: Errors are cleared when user fixes issues (AC4.9)
    When I type "x" in the name field
    And I click the save all button
    Then I should see an error summary
    When I clear the name field
    And I type "John Doe" in the name field
    And I type "john@example.com" in the email field
    And I click the save all button
    Then I should not see an error summary

  Scenario: Error summary clears on next successful save (AC4.10)
    When I type "x" in the name field
    And I click the save all button
    Then I should see an error summary
    When I clear the name field
    And I type "John Doe" in the name field
    And I type "john@example.com" in the email field
    And I click the save all button
    Then I should not see an error summary
    And the status should show "All saved"

  Scenario: Success notification appears after successful save (AC4.11)
    When I type "John Doe" in the name field
    And I type "john@example.com" in the email field
    And I click the save all button
    Then the status should show "All saved"

  Scenario: Name field validation requires minimum length
    When I type "J" in the name field
    And I type "john@example.com" in the email field
    And I click the save all button
    Then the status should show "All saved"
    And I should not see an error summary

  Scenario: Email field validation requires valid email format
    When I type "John Doe" in the name field
    And I type "not-an-email" in the email field
    And I click the save all button
    Then I should see an error summary
    And I should see an inline error for "email"
