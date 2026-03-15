import { ChevronRightIcon } from '@heroicons/react/20/solid';

export type Message = {
    id: string,
    from?: string,
    fromID: string,
    fromL?: string,
    message: string,
    datetime: Date,
    snr?: number,
    rssi?: number,
};

function formatAMPM(date: Date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var minutesS: string;
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutesS = minutes < 10 ? '0' + minutes : '' + minutes;
    var strTime = hours + ':' + minutesS + ' ' + ampm;
    return strTime;
}

export default function MessageTable({ messages }: { messages: {
    id: string;
    fromID: string;
    from: string;
    fromL: string | null;
    message: string;
    datetime: Date;
    snr: number;
    rssi: number;
}[] }) {
    return (
        <div className="mt-6 flow-root">
            <div className="inline-block min-w-full align-middle ">
                <div className="rounded-lg dark:bg-gray-700 bg-gray-100 p-2">
                    <div>
                        {messages.map((msg) => (
                            <div key={msg.id} className="mb-2 p-4 w-full rounded-md dark:bg-gray-500 bg-white">
                                <div className="flex items-center justify-between border-b border-blue-300 pb-2 dark:text-white">
                                    <div>
                                        <div className="mb-1 flex items-center text-lg font-bold">
                                            <p className="">{msg.fromL || '!' + Number(msg.fromID).toString(16)}</p>
                                        </div>
                                        <p className="text-sm">{msg.from}</p>
                                    </div>
                                    <div className='text-center rounded-sm'>
                                        <div className='text-sm'>{msg.datetime.toISOString().split('T')[0]}</div>
                                        <div className='text-sm'>{formatAMPM(msg.datetime)}</div>
                                        <div className='text-sm flex justify-between'>
                                            <div>{msg.snr}</div>
                                            <div>{msg.rssi}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex items-start mt-1'>
                                    <ChevronRightIcon className='h-5 w-5 dark:text-blue-300' />
                                    <p className='rounded-sm dark:text-gray-100 dark:bg-blue-500 w-full'>{msg.message}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export function MessageTable2({ messages }: { messages: Message[] }) {
    return (
        <div className="mt-6 flow-root">
            <div className="inline-block min-w-full align-middle">
                <div className="rounded-lg dark:bg-gray-700 bg-gray-50 p-2">
                    <div>
                        {messages.map((msg) => (
                            <div key={msg.id} className="mb-2 p-4 w-full rounded-md dark:bg-gray-500 bg-white">
                                <div className="flex items-center justify-between border-b pb-2">
                                    <div>
                                        <div className="mb-1 flex items-center">
                                            <p className="dark:text-green-500">{msg.fromL}</p>
                                        </div>
                                        <p className="text-sm">{msg.from}</p>
                                    </div>
                                    <div className='text-center rounded-sm dark:bg-gray-400'>
                                        <div className='text-sm'>{msg.datetime.toISOString().split('T')[0]}</div>
                                        <div className='text-sm'>{formatAMPM(msg.datetime)}</div>
                                        <div className='text-sm flex justify-between'>
                                            <div>{msg.snr}</div>
                                            <div>{msg.rssi}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex items-start mt-1'>
                                    <ChevronRightIcon className='h-5 w-5' />
                                    <p className='rounded-sm dark:bg-gray-400 w-full'>{msg.message}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
