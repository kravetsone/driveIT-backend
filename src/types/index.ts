import "@fastify/jwt";
import { User } from "@db";
import {
    FastifyBaseLogger,
    FastifyInstance,
    RawReplyDefaultExpression,
    RawRequestDefaultExpression,
    RawServerDefault,
} from "fastify";
import { File } from "fastify-multer/lib/interfaces";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { ZodError } from "zod";

export type FastifyZodInstance = FastifyInstance<
    RawServerDefault,
    RawRequestDefaultExpression<RawServerDefault>,
    RawReplyDefaultExpression<RawServerDefault>,
    FastifyBaseLogger,
    ZodTypeProvider
>;

declare module "@fastify/jwt" {
    interface FastifyJWT {
        payload: {
            id: number;
            password: string;
        };
        jwtUser: {
            id: number;
            password: string;
        };
    }
}
declare module "fastify" {
    interface PassportUser extends User {}

    interface FastifyInstance {
        auth: (
            getUser?: boolean,
        ) => (req: FastifyRequest, res: FastifyReply) => void;
    }
    interface FastifyRequest {
        user?: User | null;
        file?: File;
    }

    interface FastifyError extends ZodError {}
}

export type TRoute = (fastify: FastifyZodInstance) => unknown;

export enum GTFSFiles {
    AGENCY = "agency.txt",
    CALENDAR = "calendar.txt",
    ROUTES = "routes.txt",
    STOPS = "stops.txt",
    STOP_TIMES = "stop_times.txt",
    TRIPS = "trips.txt",
    AMINITY = "amenity.txt",
}

export interface IStopDataGTFS {
    stop_id: number | string;
    stop_name: string;
    stop_lat: number;
    stop_lon: number;
    location_type: number;
    parent_station?: number | string;
    platform_code?: string;
}

export interface IRouteDataGTFS {
    route_id: number;
    agency_id: string;
    route_short_name: number | string;
    route_long_name: string;
    route_type: number;
    route_url: string;
}

export interface IAgencyDataGTFS {
    agency_id: string;
    agency_name: string;
    agency_url: string;
    agency_timezone: string;
    agency_lang: string;
}

export interface ICalendarDataGTFS {
    service_id: string;
    monday: number;
    tuesday: number;
    wednesday: number;
    thursday: number;
    friday: number;
    saturday: number;
    sunday: number;
    start_date: number;
    end_date: number;
}

export interface IStopTimeDataGTFS {
    trip_id: number;
    arrival_time: string;
    departure_time: string;
    stop_id: string;
    stop_sequence: number;
    stop_headsign: string;
}

export interface ITripDataGTFS {
    route_id: number;
    service_id: string;
    trip_id: number;
}

export interface IShipDataGTFS {
    ship_id: number;
    ship_name: string;
}

export interface IGtfsRTMessage {
    msg_type: string;
    data: IGtsfRTData[];
}
export interface IGtsfRTData {
    id: number;
    cog: number;
    lat: number;
    lon: number;
    sog: number;
    ts: number;
}
