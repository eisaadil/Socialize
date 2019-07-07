package com.eisaadil;

import com.google.gson.Gson;
import com.google.gson.JsonObject;

/**
 * Created by eisaadil on 08/08/17.
 */
public class Helpers {
    public static String getDataInJSONHelperReturnsData(Object object) {
        if (object != null) {
            JsonObject response = new JsonObject();
            response.addProperty("status", 1);
            response.add("data", (new Gson()).toJsonTree(object));
            return response.toString();
        } else {
            JsonObject response = new JsonObject();
            response.addProperty("status", 0);
            return response.toString();
        }
    }

    public static String getDataInJSONHelperReturnsBoolean(boolean condition) {
        if (condition) {
            JsonObject response = new JsonObject();
            response.addProperty("status", 1);
            return response.toString();
        } else {
            JsonObject response = new JsonObject();
            response.addProperty("status", 0);
            return response.toString();
        }
    }
}
