import express from 'express';
import { User } from './user';
import { NotificationCenter } from './notification-center';
import FacebookNotification from "./facebookNotification";
import EmailNotification from "./emailNotification";

let user = new User();

const notCenter = new NotificationCenter();
notCenter.notify(new FacebookNotification(), user, 'Notification test');
notCenter.notify(new EmailNotification(), user, 'Notification test');
