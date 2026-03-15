'use server'

import {prisma} from '@/app/lib/prisma';
import { Message } from '../ui/MessageTable';

export async function fetchLatestMessages(){
    console.log('fetching')
    const latestMessagesRaw = await prisma.text.findMany({
        take: 20,
        orderBy: [
            {
                timestamp: 'desc'
            }
        ],
        // include: {
        //     nodeinfo: true
        // }
    });
    console.log('got', latestMessagesRaw.length, ' msgs');
    const latestMessages = await Promise.all(latestMessagesRaw.map(async (text) => {
        const node = await prisma.nodeinfo.findUnique({where: {from: text.from}});
        return {
            id: text.id,
            fromID: text.from.toString(),
            from: node ? node.payload.shortname : '',
            fromL: node ? node.payload.longname : null,
            message: text.payload.text,
            datetime: new Date(text.timestamp*1000),
            snr: Number(text.snr),
            rssi: Number(text.rssi),
        };
    }));
    return latestMessages;
}