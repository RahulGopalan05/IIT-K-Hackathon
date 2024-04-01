import React from 'react';
import "./Userguides.css";

const UserGuidesPage = () => {
  return (
    <div class="user-guides">
        <h2>User Guides</h2>
        <ol>
            <li>
                <h3>Search for properties</h3>
                <p>Use the search bar at the top of the page to search for properties by location, price range, and property type.</p>
            </li>
            <li>
                <h3>Browse listings</h3>
                <p>Browse through the listings to view detailed information about each property, including photos, descriptions, and pricing.</p>
            </li>
            <li>
                <h3>Use map view</h3>
                <p>Explore properties geographically using the map view. Zoom in and out and click on markers to view property details.</p>
            </li>
            <li>
                <h3>Save favorite properties</h3>
                <p>Save your favorite properties by clicking the heart icon. Access your favorites list for easy reference.</p>
            </li>
            <li>
                <h3>Contact sellers</h3>
                <p>Contact sellers directly through the platform to inquire about properties or schedule viewings.</p>
            </li>
            <li>
                <h3>Use augmented reality (AR)</h3>
                <p>Visualize properties in 3D using the AR feature. See how furnishings and furniture would look in the space.</p>
            </li>
            <li>
                <h3>For sellers</h3>
                <p>Upload 2D and 360 panorama images of your property to showcase it to potential buyers. Share images with customers on a one-to-one basis.</p>
            </li>
            <li>
                <h3>Manage listings</h3>
                <p>Manage your property listings and edit various components such as descriptions, pricing, and photos.</p>
            </li>
            <li>
                <h3>Ensure responsiveness</h3>
                <p>Ensure your web application is responsive across various operating systems and screen sizes for a seamless user experience.</p>
            </li>
            <li>
                <h3>Integrate security features</h3>
                <p>Integrate security features to ensure that customers can only view listings that have been shared with them.</p>
            </li>
            <li>
                <h3>Utilize geo-tag integration</h3>
                <p>Provide users with location-based information and services using geo-tag integration.</p>
            </li>
            <li>
                <h3>Include 360 panorama photos</h3>
                <p>Include 360 panorama photos within property listings to give users a comprehensive view of the property.</p>
            </li>
            <li>
                <h3>Integrate other 3D objects</h3>
                <p>Integrate/augment other 3D objects from a selection to enhance the user experience.</p>
            </li>
        </ol>
    </div>
  );
};

export default UserGuidesPage;