import { client } from '$lib/mongo.server';
import type { RequestHandler } from '@sveltejs/kit';
import { ObjectId } from 'mongodb';

export const GET: RequestHandler = async () => {
  let events = await client.db("data").collection("events").find().sort({date: 1}).toArray()
  console.log(events);
  
  return new Response(JSON.stringify(events), { status: 200, headers: { 'Content-Type': 'application/json' } });
};

export const POST: RequestHandler = async ({request}) => {
  let event = await request.json()
  await client.db('data').collection('events').insertOne(event);
  return new Response(null, { status: 201 });
}

export const PUT: RequestHandler = async ({params, request}) => {
  let event = await request.json();

  let id = new ObjectId(event._id);

  let event_copy = event;
  delete event_copy._id;

  console.log(id);
 

  let res = await client.db('data').collection('events').updateOne(
    { _id: id },
    {$set: event}, {upsert: true}
  );

  let res2 = await client.db("data").collection("events").findOne({ _id: id });

  console.log(res2);
  

  return new Response(JSON.stringify(event), { status: 200, headers: { 'Content-Type': 'application/json' } });
}