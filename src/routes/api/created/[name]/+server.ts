import { client } from '$lib/mongo.server';
import type { RequestHandler } from '@sveltejs/kit';
import { ObjectId } from 'mongodb';

export const GET: RequestHandler = async ({params}) => {
  let events = await client.db("data").collection("events").find({ creator: params.name }).sort({date: 1}).toArray();
  return new Response(JSON.stringify(events), { status: 200, headers: { 'Content-Type': 'application/json' } });
};
