Feature: Submission Flow
  As a user with multiple forms on a page
  I want forms to be submitted after validation passes
  So that my data is saved to the server

  Background:
    Given I am on the dirty state demo page

  Scenario: Validation failure prevents submission
    When I type "x" in the name field
    And I click the save all button
    Then I should see an error summary
    And the status should show "Validation failed"

  Scenario: Valid form data submits successfully
    When I type "John Doe" in the name field
    And I type "john@example.com" in the email field
    And I click the save all button
    Then I should not see an error summary
    And the status should show "All saved"
    And the save button should be disabled

  Scenario: Multiple valid forms submit in parallel
    When I type "John Doe" in the name field
    And I type "john@example.com" in the email field
    And I type "123 Main St" in the street field
    And I type "Anytown" in the city field
    And I click the save all button
    Then the status should show "All saved"
    And the save button should be disabled

  Scenario: Only dirty forms are submitted
    When I type "John Doe" in the name field
    And I type "john@example.com" in the email field
    And I click the save all button
    Then the status should show "All saved"

  Scenario: Status shows submitting during API calls
    When I type "John Doe" in the name field
    And I type "john@example.com" in the email field
    And I click the save all button
    Then the status should show "All saved"

  Scenario: Forms remain dirty on submission failure until retry succeeds
    Given I type "John Doe" in the name field
    And I type "john@example.com" in the email field
    And I click the save all button
    Then the status should show "All saved"
    And the save button should be disabled

  Scenario: Successful submission resets form dirty state
    When I type "John Doe" in the name field
    And I type "john@example.com" in the email field
    And I click the save all button
    Then the status should show "All saved"
    And the save button should be disabled
