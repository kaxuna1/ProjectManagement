package main;

import main.models.JsonMessage;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.HashMap;

/**
 * Created by kaxa on 11/24/16.
 */
public class StaticData {
    public static HashMap<Long,SseEmitter> emitterHashMap=new HashMap<>();
}
