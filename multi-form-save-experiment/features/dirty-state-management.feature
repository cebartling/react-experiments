Feature: Dirty State Management
  As a user with multiple forms on a page
  I want to see when I have unsaved changes
  So that I know to save before leaving

  Background:
    Given I am on the dirty state demo page

  Scenario: Initially all forms are clean
    Then the save button should be disabled
    And the status should show "All saved"

  Scenario: Modifying a form marks it as dirty
    When I type "John" in the name field
    Then the save button should be enabled
    And the status should show "Unsaved changes"
    And the dirty forms should include "userInfo"

  Scenario: Modifying multiple forms tracks all dirty forms
    When I type "John" in the name field
    And I type "123 Main St" in the street field
    Then the status should show "Unsaved changes"
    And the dirty forms should include "userInfo"
    And the dirty forms should include "address"

  Scenario: Resetting a form marks it as clean
    When I type "John" in the name field
    And I click the user form reset button
    Then the save button should be disabled
    And the status should show "All saved"

  Scenario: Save all button clears all dirty state
    When I type "John" in the name field
    And I type "123 Main St" in the street field
    And I click the save all button
    Then the save button should be disabled
    And the status should show "All saved"

  Scenario: One form clean while another remains dirty
    When I type "John" in the name field
    And I type "123 Main St" in the street field
    And I click the user form reset button
    Then the save button should be enabled
    And the status should show "Unsaved changes"
    And the dirty forms should include "address"
    And the dirty forms should not include "userInfo"
