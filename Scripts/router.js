"use strict";

(function (core) {
    class Router {
        // constructors
        constructor() {
            this.ActiveLink = "";
            this.m_routingTable = []; // Initialize the routing table as an empty array
        }

        // Public Properties (getters and setters)
        get ActiveLink() {
            return this.m_activeLink;
        }

        set ActiveLink(link) {
            this.m_activeLink = link;
        }

        get LinkData() {
            return this.m_linkData;
        }
        set LinkData(data) {
            this.m_linkData = data;
        }

        // Public methods

        /**
         * Adds a new route to the Routing Table
         *
         * @param {string} route
         * @returns {void}
         */
        Add(route) {
            this.m_routingTable.push(route);
        }

        /**
         * This replaces the current Routing Table with a new one
         * Routes should begin with / character
         *
         * @param {string[]} routingTable
         * @returns {void}
         */
        AddTable(routingTable) {
            this.m_routingTable = routingTable;
        }

        /**
         * This method finds the index of the route in the routing table
         * otherwise it returns -1 if the route is not found
         *
         * @param {string} route
         * @returns {number}
         */
        Find(route) {
            return this.m_routingTable.indexOf(route);
        }

        /**
         * This method removes a route from the Routing Table
         * It returns true if the route was successfully removed,
         * otherwise it returns false
         *
         * @param {string} route
         * @returns {boolean}
         */
        Remove(route) {
            if (this.Find(route) > -1) {
                this.m_routingTable.splice(this.Find(route), 1);
                return true;
            }
            return false;
        }

        /**
         * This method returns the routing table as a comma-separated string
         *
         * @returns {string}
         */
        ToString() {
            return this.m_routingTable.toString();
        }
    }
    core.Router = Router;
})(core || (core = {}));

let router = new core.Router();
router.AddTable([
    "/", // Root path should be included as "home"
    "/home",
    "/about",
    "/services",
    "/contact",
    "/contact-list",
    "/projects",
    "/register",
    "/login",
    "/edit",
    "/tasklist"
]);

let route = location.pathname; // alias for location.pathname

// Check if the route exists in the routing table
if (router.Find(route) > -1) {
    router.ActiveLink = (route === "/") ? "home" : route.substring(1); // Use strict comparison (===)
} else {
    router.ActiveLink = "404";
}
