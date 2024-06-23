import { client } from '$lib/mongo.server';
import type { RequestHandler } from '@sveltejs/kit';
import { ObjectId } from 'mongodb';

export const GET: RequestHandler = async ({params}) => {
  if (params.id == undefined) {
    return new Response("Bad ID", { status: 404 });
  }
  let events = await client.db("data").collection("events").findOne({ _id: new ObjectId(params.id) });
  return new Response(JSON.stringify(events), { status: 200, headers: { 'Content-Type': 'application/json' } });
};

export const DELETE: RequestHandler = async ({params}) => {
  if (params.id == undefined) {
    return new Response("Bad ID", { status: 404 });
  }
  let events = await client.db("data").collection("events").deleteOne({ _id: new ObjectId(params.id) });
  return new Response(JSON.stringify(events), { status: 200, headers: { 'Content-Type': 'application/json' } });
}
