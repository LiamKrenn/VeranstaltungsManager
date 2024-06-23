export type EventType = {
	_id?: string;
	title: string;
	description: string;
	date: number;
	location: string;
	attendees: string[];
  creator?: string;
};
