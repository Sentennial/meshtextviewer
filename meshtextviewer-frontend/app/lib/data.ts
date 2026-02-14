'use server'

import {prisma} from '@/app/lib/prisma';
import { Message } from '../ui/MessageTable';

export async function fetchLatestMessages(){
    const latestMessagesRaw = await prisma.text.findMany({
        take: 20,
        orderBy: [
            {
                timestamp: 'desc'
            }
        ],
        include: {
            nodeinfo: true
        }
    });
    const latestMessages: Message[] = latestMessagesRaw.map(msg => ({
        id: msg.id,
        fromID: msg.from.toString(),
        from: msg.nodeinfo.payload.shortname,
        fromL: msg.nodeinfo.payload.longname,
        message: msg.payload.text,
        datetime: new Date(msg.timestamp*1000),
        snr: Number(msg.snr),
        rssi: Number(msg.rssi),
    }));
    return latestMessages;
}