package com.eisaadil.models;

/**
 * Created by eisaadil on 10/08/17.
 */
public class ToAndFromUserId {
    long toUserId;
    long fromUserId;

    public ToAndFromUserId() {
    }

    public ToAndFromUserId(long toUserId, long fromUserId) {
        this.toUserId = toUserId;
        this.fromUserId = fromUserId;
    }

    public long getToUserId() {
        return toUserId;
    }

    public void setToUserId(long toUserId) {
        this.toUserId = toUserId;
    }

    public long getFromUserId() {
        return fromUserId;
    }

    public void setFromUserId(long fromUserId) {
        this.fromUserId = fromUserId;
    }
}