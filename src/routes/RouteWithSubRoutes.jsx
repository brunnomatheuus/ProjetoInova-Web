import React from "react";
import { BrowserRouter as Route } from "react-router-dom";


function RouteWithSubRoutes(route) {
    return (
      <Route
        path={route.path}
        render={props => (
          // pass the sub-routes down to keep nesting
          <route.component {...props} routes={route.children} />
        )}
      />
    );
  }

export default RouteWithSubRoutes