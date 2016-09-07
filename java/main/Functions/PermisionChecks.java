package main.Functions;

import main.models.Project.Project;
import main.models.UserManagement.User;

import java.util.List;

/**
 * Created by kakha on 9/5/2016.
 */
public class PermisionChecks {
    public static boolean checkIfProjectContainsPrarab(User prarab,Project project){
        return project.getPrarabs().contains(prarab);
    }
}
