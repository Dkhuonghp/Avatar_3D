/// <reference types="react" />
import * as THREE from 'three';
import { SharedCanvasContext, RenderCallback } from './canvas';
export declare function useFrame(callback: RenderCallback, renderPriority?: number): null;
export declare function useThree(): SharedCanvasContext;
export declare function useUpdate<T>(callback: (props: T) => void, dependents: any[], optionalRef?: React.MutableRefObject<T>): React.MutableRefObject<T> | React.MutableRefObject<undefined>;
export declare function useResource<T>(optionalRef?: React.MutableRefObject<T>): React.MutableRefObject<T>;
export interface Loader<T> extends THREE.Loader {
    load(url: string, onLoad?: (result: T) => void, onProgress?: (event: ProgressEvent) => void, onError?: (event: ErrorEvent) => void): unknown;
}
declare type Extensions = (loader: THREE.Loader) => void;
declare type LoaderResult<T> = T extends any[] ? Loader<T[number]> : Loader<T>;
declare type ObjectMap = {
    nodes: {
        [name: string]: THREE.Object3D;
    };
    materials: {
        [name: string]: THREE.Material;
    };
};
export declare function useGraph(object: THREE.Object3D): ObjectMap;
export declare function useLoader<T>(Proto: new () => LoaderResult<T>, input: T extends any[] ? string[] : string, extensions?: Extensions, onProgress?: (event: ProgressEvent<EventTarget>) => void): T;
export declare namespace useLoader {
    var preload: <T>(Proto: new () => LoaderResult<T>, url: T extends any[] ? string[] : string, extensions?: Extensions | undefined) => undefined;
}
export {};
