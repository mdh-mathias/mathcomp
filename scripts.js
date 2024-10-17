body {
    font-family: 'Roboto', Arial, sans-serif;
    background-color: #f0f0f0;
    margin: 0;
    padding: 20px;
    color: #333;
}

h1 {
    text-align: center;
    color: #333;
}

/* Filter Container Styling */
.filter-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto; /* Center the filter container */
    max-width: 300px; /* Matches the competition card width */
    width: 100%;
    margin-bottom: 20px; /* Space between the filter and content below */
}

/* Toggle Button Styles */
.filter-toggle {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #007aff; /* Apple's signature blue color */
    color: white;
    padding: 8px 16px; /* Reduced padding for a more compact size */
    border: none;
    border-radius: 10px;
    font-size: 14px;
    cursor: pointer;
    transition: background-color 0.2s ease, padding 0.2s ease;
}

.filter-toggle:hover {
    background-color: #005bb5; /* Slightly darker blue on hover */
}

.filter-toggle.open {
    padding: 6px 12px; /* Further reduced padding when the dropdown is open */
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0; /* Flat bottom corners when open */
}

/* Dropdown Filter Styles */
.filter-dropdown {
    display: none; /* Hidden by default */
    background-color: #f9f9f9; /* Light background color */
    border: 1px solid #e0e0e0;
    border-radius: 0 0 12px 12px; /* Rounded bottom corners */
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
    padding: 12px;
    width: 100%;
    max-width: 600px; /* Ensures dropdown width matches design */
}

/* Dropdown visible when the toggle is active */
.filter-dropdown.show {
    display: block;
}

/* Filter Group Styles */
.filter-group {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 8px 0; /* Consistent spacing between filter groups */
}

/* Styling for filter labels and inputs */
.filter-label {
    flex: 1; /* Ensures labels take up appropriate space */
    font-size: 14px;
    color: #333; /* Dark text color for readability */
}

.filter-select {
    flex: 2; /* Inputs take slightly more space than labels */
    padding: 8px 12px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #ffffff; /* White background for dropdowns */
}

/* Filter Group for "Show curated only" Checkbox */
.filter-group.curated-filter {
    display: flex;
    align-items: center;
    justify-content: flex-start; /* Align checkbox to the left */
    width: 100%; /* Ensure it spans the full width */
    margin: 8px 0; /* Consistent spacing */
}

/* Ensure the checkbox appears first, followed by the label */
.filter-checkbox {
    margin-right: 8px; /* Space between the checkbox and its label */
}


/* Checkbox alignment fix */
.filter-checkbox {
    margin-right: 8px; /* Space between the checkbox and label */
}

/* Responsive Design for Smaller Screens */
@media (max-width: 768px) {
    .filter-group {
        flex-direction: column; /* Stack filter elements vertically on small screens */
        align-items: flex-start;
    }

    .filter-select, .filter-checkbox {
        width: 100%; /* Full-width for better alignment on smaller screens */
    }
}

/* Smooth Fade Animation (if needed) */
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
}


@media (max-width: 480px) {
    .filter-container {
        align-items: center;
    }

    .filter-dropdown {
        width: 100%;
    }
}

.competition-list {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
}

/* .competition-card {
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 20px;
    width: 300px;
    display: flex;
    flex-direction: column;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.competition-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    transition: transform 0.2s, box-shadow 0.2s;
}
*/

.competition-card {
    background-color: white;
    border-radius: 16px; /* More pronounced rounded corners */
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); /* Softer shadow */
    padding: 20px;
    width: 300px;
    display: flex;
    flex-direction: column;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.competition-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); /* More natural hover shadow */
}

/* Competition Header with Larger Logo */
.competition-header {
    display: flex;
    align-items: center; /* Align logo and text vertically */
    margin-bottom: 10px;
    gap: 15px; /* Space between the logo and the text */
    flex-wrap: wrap; /* Prevent wrapping to keep logo and text on the same line */
    justify-content: space-between; /* Ensures space between the title and label */

}

.competition-logo {
    width: 60px; /* Increase the logo size */
    height: 60px; /* Increase height to match width for a larger display */
    border-radius: 8px; /* Optional rounded corners for a softer look */
    object-fit: cover; /* Ensure the logo scales correctly without distortion */
    flex-shrink: 0; /* Prevent the logo from shrinking on smaller screens */
}

.competition-title {
    font-size: 18px;
    font-weight: bold;
    margin: 0;
    flex: 1; /* Allow the title to take up the remaining space */
    word-break: break-word; /* Ensure text breaks properly without overlapping */
    /*margin-left: 10px; Ensure spacing between the logo and text */
}

.curated {
    background-color: #e6f7e6;
    color: #28a745;
    font-size: 12px;
    padding: 2px 6px;
    border-radius: 12px;
    white-space: nowrap;
    align-self: flex-start;
    margin-top: 5px;    
}

.competition-details {
    font-size: 14px;
    color: #666;
    margin-bottom: 10px;
}

.competition-labels {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    margin-bottom: 10px;
}
/*
.label {
    font-size: 12px;
    padding: 2px 6px;
    border-radius: 12px;
}

.label {
    font-weight: 500;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}
*/
.label {
    font-size: 12px;
    padding: 4px 10px;
    border-radius: 10px;
    font-weight: 500;
    background-color: #f0f0f0; /* Light gray for all labels */
    color: #555; /* Consistent text color */
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}


.label-Offline {
    background-color: #fff3e0;
    color: #ff9800;
}

.label-Online {
    background-color: #e8f5e9;
    color: #4caf50;
}

.label-language {
    background-color: #f3e5f5;
    color: #9c27b0;
}

/* .label-grades {
    background-color: #fff9c4;
    color: #fbc02d;
}
*/
.label-grades {
    background-color: #e3f2fd; /* Light blue background */
    color: #1976d2; /* Soft blue text */
}

.register-container {
    margin-top: auto;
    padding-top: 10px;
}

/*.register-btn {
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 20px;
    padding: 8px 16px;
    font-size: 14px;
    cursor: pointer;
    width: auto;
    display: inline-block;
}
    
.register-btn {
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 50px;
    padding: 10px 20px;
    font-size: 14px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.register-btn:hover {
    background-color: #0056b3;
}

*/

.register-btn {
    background: linear-gradient(to bottom right, #007bff, #0056b3); /* Subtle gradient */
    color: white;
    border: none;
    border-radius: 22px; /* Rounded button shape */
    padding: 10px 20px;
    font-size: 14px;
    cursor: pointer;
    transition: background 0.3s ease, transform 0.1s ease;
}

.register-btn:hover {
    background: linear-gradient(to bottom right, #0056b3, #003f7f); /* Darker gradient on hover */
    transform: scale(1.02); /* Slightly enlarge on hover */
}


.show-more {
    background: none;
    border: none;
    color: #007bff;
    font-size: 14px;
    cursor: pointer;
    padding: 0;
    margin-top: 10px;
    display: block;
    text-align: left;
}

.show-more:hover {
    text-decoration: underline;
    color: #0056b3;
}

.additional-info {
    display: none;
    margin-top: 10px;
    font-size: 14px;
    color: #666;
    border-top: 1px solid #eee;
    padding-top: 10px;
}

.additional-info h3 {
    font-size: 16px;
    margin: 10px 0 5px;
    color: #333;
}

/* Smaller gap within fields for line breaks */
.small-gap {
    display: block;
    height: 7px; /* Adjust this value to control the gap size within a field */
}

.additional-info p {
    margin: 10px 0; /* Space between different fields */
}

.additional-info br + br {
    margin: 0; /* Reset margin between two consecutive <br> tags */
}


.prerequisites-list {
    padding-left: 20px;
    margin: 5px 0;
    line-height: 1.2;
}

@media (min-width: 1200px) {
    .competition-list {
        flex-direction: column;
        align-items: center;
    }

    .competition-card {
        width: 100%;
        max-width: 800px;
    }
}
/*
@media (max-width: 480px) {
    .competition-card {
        width: 100%;
    }

    .competition-header {
        flex-direction: column;
    }

    .curated {
        margin-top: 5px;
    }
}

@media (max-width: 480px) {
    .filters {
        display: block;
        text-align: center;
    }
}
*/
@media (max-width: 480px) {
    .competition-card {
        width: 95%;
    }

    .filters {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    
    .competition-header {
        flex-direction: column; /* Stack the items vertically */
        align-items: flex-start; /* Align items to the start */
    }

    .competition-logo {
        align-self: flex-start; /* Align the logo to the start */
        margin-top: 10px; /* Add spacing between the logo and title */
    }
}
