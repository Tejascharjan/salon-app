import React, { useEffect, useState } from 'react'
import Stomp from 'stompjs'
import SockJS from 'sockjs-client'
import { useDispatch, useSelector } from 'react-redux'
import { addNotification } from '../Redux/Notifications/action'

export const UseNotificationWebsocket = ({ userId, type }) => {
    const [stompClient, setStompClient] = useState(null);
    const dispatch = useDispatch();
    const { auth } = useSelector((store) => store);

    useEffect(() => {
        if (userId) {
            const sock = new SockJS("http://localhost:5000/api/notifications/ws");
            const stomp = Stomp.over(sock);
            setStompClient(stomp);
        }
    }, [userId])

    useEffect(() => {
        if (stompClient) {
            stompClient.connect({}, () => {
                stompClient.subscribe(`/notification/${type}/${auth.user?.id}`, (message) => {
                    const receivedMessage = JSON.parse(message.body);
                    dispatch(addNotification(receivedMessage));
                });
            }, (error) => {
                console.log("error", error);
            });
        }
    }, [stompClient, userId])

}
