import express from 'express';
import { User } from './user';
import { NotificationCenter } from './notification-center';
import FacebookNotification from "./facebookNotification";

let user = new User();

const notCenter = new NotificationCenter();
notCenter.notify(new FacebookNotification(), user, 'test');
