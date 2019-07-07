package com.eisaadil.services;

import com.eisaadil.Helpers;
import com.eisaadil.models.Chat;
import com.eisaadil.models.ToAndFromUserId;
import com.eisaadil.repositories.ChatJDBC;
import com.eisaadil.repositories.UserJDBC;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChatService {
    @Autowired
    private SimpMessagingTemplate template;

    @Autowired
    private ChatJDBC chatJdbcTemplate;

    @Autowired
    private UserJDBC userJdbcTemplate;


    @MessageMapping("/chat")
    @SendTo("/queue/chatQueue")
    public void updateChat(ToAndFromUserId toAndFromUserId) throws Exception {
        Thread.sleep(1000); // simulated delay
    }

    public String createChat(Chat chat) {
        /*
            Response:
                1: Chat successful -- status, data
                0: Chat failed -- status
         */
        Chat newChat = chatJdbcTemplate.createChat(chat);
        String fromUsername = userJdbcTemplate.getUserFromId(chat.getFromUserId()).getUsername();
        String toUsername = userJdbcTemplate.getUserFromId(chat.getToUserId()).getUsername();
        System.out.println(fromUsername + "to" + toUsername);
        template.convertAndSend("/queue/chatQueue/" + fromUsername + "/" + toUsername, chatJdbcTemplate.getAllChatsBetweenTwoUsers(chat.getFromUserId(), chat.getToUserId()));
        template.convertAndSend("/queue/chatQueue/" + toUsername + "/" + fromUsername, chatJdbcTemplate.getAllChatsBetweenTwoUsers(chat.getFromUserId(), chat.getToUserId()));
        return Helpers.getDataInJSONHelperReturnsData(newChat);
    }

    public String getChatFromId(long id) {
        /*
            Response:
                1: Got chat -- status, data
                0: Failed to get chat -- status
         */
        Chat chat = chatJdbcTemplate.getChatFromId(id);
        return Helpers.getDataInJSONHelperReturnsData(chat);
    }

    public String getAllChatsBetweenTwoUserIds(long fromUserId, long toUserId) {
        List<Chat> allChatsBetweenTwoUserIds = chatJdbcTemplate.getAllChatsBetweenTwoUsers(fromUserId, toUserId);
        return Helpers.getDataInJSONHelperReturnsData(allChatsBetweenTwoUserIds);
    }

    public String getAllChatsBetweenTwoUsernames(String fromUsername, String toUsername) {
        long fromUserId = chatJdbcTemplate.getIdFromUsername(fromUsername);
        long toUserId = chatJdbcTemplate.getIdFromUsername(toUsername);
        List<Chat> allChatsBetweenTwoUserIds = chatJdbcTemplate.getAllChatsBetweenTwoUsers(fromUserId, toUserId);
        return Helpers.getDataInJSONHelperReturnsData(allChatsBetweenTwoUserIds);
    }
}
