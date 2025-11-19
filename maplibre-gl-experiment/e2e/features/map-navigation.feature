Feature: Map Navigation
  As a user
  I want to navigate the map
  So that I can explore different locations

  Background:
    Given I am on the map application

  Scenario: View the default map location
    Then I should see the map centered on Shakopee, MN
    And the map should display cell towers

  Scenario: Search for a new location using coordinates
    When I enter latitude "40.7128" and longitude "-74.0060"
    And I submit the location search
    Then the map should fly to the new location
    And the location inputs should update to reflect the new center

  Scenario: Drag the map to reposition
    When I drag the map
    Then I should see a pulsating crosshair at the map center
    And I should see real-time coordinates in the crosshair popup
    When I release the map drag
    Then the crosshair should disappear
    And the location should be persisted to storage

  Scenario: Zoom the map
    When I zoom in on the map
    Then the map zoom level should increase
    And the map center should remain stable
    When I zoom out on the map
    Then the map zoom level should decrease
    And the map center should remain stable

  Scenario: Switch base layers
    When I click on the "Satellite" layer button
    Then the map should display satellite imagery
    And the "Satellite" button should be highlighted
    When I click on the "Street" layer button
    Then the map should display street view
    And the "Street" button should be highlighted
