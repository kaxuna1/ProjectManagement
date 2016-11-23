package main.Functions;

/**
 * Created by kaxa on 11/18/16.
 */
public class StaticFunctions {
    public static boolean checkValueNotEmpty(String... params){
        for(String param:params){
            if (param.isEmpty()){
                return false;
            }
        }

        return true;
    }
    public static String getStr(String string){
        return string;
    }
}
