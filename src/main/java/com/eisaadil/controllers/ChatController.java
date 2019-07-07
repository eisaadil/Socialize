package com.eisaadil.controllers;

import com.eisaadil.models.Chat;
import com.eisaadil.models.ToAndFromUserId;
import com.eisaadil.services.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.*;

/**
 * Created by eisaadil on 10/08/17.
 */
@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/chat")
public class ChatController {

    @Autowired
    private ChatService chatService;

    @MessageMapping("/chat")
    @SendTo("/queue/chatQueue")
    public void updateChat(ToAndFromUserId toAndFromUserId) throws Exception {
        Thread.sleep(1000); // simulated delay
    }

    @RequestMapping(value = "/createChat", method = RequestMethod.POST)
    public String createChat(@RequestBody Chat chat) {
        return chatService.createChat(chat);
    }

    @RequestMapping(value = "/getChatFromId", method = RequestMethod.POST)
    public String getChatFromId(@RequestParam long id) {
        return chatService.getChatFromId(id);
    }

    @RequestMapping(value = "/getAllChatsBetweenTwoUserIds", method = RequestMethod.POST)
    public String getAllChatsBetweenTwoUserIds(@RequestParam long fromUserId, @RequestParam long toUserId) {
        return chatService.getAllChatsBetweenTwoUserIds(fromUserId, toUserId);
    }

    @RequestMapping(value = "/getAllChatsBetweenTwoUsernames", method = RequestMethod.POST)
    public String getAllChatsBetweenTwoUsernames(@RequestParam String fromUsername, @RequestParam String toUsername) {
        return chatService.getAllChatsBetweenTwoUsernames(fromUsername, toUsername);
    }


}
