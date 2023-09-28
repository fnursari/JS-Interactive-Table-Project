# Interactive Table Project

## Description

This project represents a basic interactive table created using HTML and JavaScript. It enables users to input name and points, add new rows to the table, and perform actions like update and delete on the existing rows. Additionally, it provides a dynamic average calculation and displays it in the footer section of the table.

## Features
- **Add Rows:** Allows users to add new rows with name and points information.
- **Update Rows:** Enables users to update the name and points of existing rows.
- **Delete Rows:** Grants users the ability to delete rows from the table.
- **Dynamic Average Calculation:** Dynamically calculates and displays the average of points in the table.
- **Responsive Design:** Adapts to different screen sizes for optimized user experience.

## How to Use
1. Clone or download the project to your local machine.
2. Open the `index.html` file in your preferred web browser.
3. The project is now ready for use.
4. Input name and points and use the provided controls to interact with the table.

## Functions Overview
- **btnAdd.addEventListener:** Manages user interaction, triggering when the "Add" button is clicked, creating a new row with the user-input information.
- **getNewRows:** Constructs a new row with the user-input name and points, attaching event listeners to the newly created row.
- **updateTableRowIndex:** Updates the table row indices when any changes are made to the table.
- **updateAverage:** Dynamically recalculates and updates the average points whenever the table is altered.
- **setFooter:** Manages the visibility of the "No records found" row and the average row, based on the content of the table body.
- **resetTableRows and resetForm:** Revert the table rows and the input form to their initial states.
- **attachDeleteEventListener, attachUpdateEventListener, attachCancelEventListener, attachApproveEventListener:** Attach respective event listeners to handle delete, update, cancel, and approve actions on table rows.

## Support & Contribution
For support, feature requests, or contributions, please open an issue or submit a pull request on GitHub.
