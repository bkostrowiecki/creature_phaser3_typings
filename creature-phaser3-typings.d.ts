declare class CreatureTimeSample {
    beginTime: number;
    endTime: number;
    dataIdx: number;

    constructor(beginTimeIn: number, endTimeIn: number, dataIdxIn: number);

    getAnimPointsOffset(): number;
    getAnimUvsOffset(): number;
    getAnimColorsOffset(): number;
}

declare class CreaturePackAnimClip {
    dataIdx: any;
    startTime: number;
    endTime: number;
    firstSet: boolean;
    timeSamplesMap: { [key: number]: CreatureTimeSample };
    withLoop: boolean;

    constructor(dataIdxIn);

    sampleTime(timeIn: number);
    correctTime(timeIn: number, withLoop?: boolean);
    addTimeSample(timeIn: number, dataIdxIn: any);
    finalTimeSamples();
}

declare class graphNode {
    idx: number;
    visited: boolean;
    neighbours: number[];
    constructor(idxIn: number);
}

declare type CreatePackObjArgs = { scene?: Phaser.Scene, x: number, y: number, byte_data_in: any, texture_key: string };
declare type CreatePackObjFunc = (args: CreatePackObjArgs) => CreatePackObj;

export declare class CreatePackObj extends Phaser.GameObjects.Mesh {
    pack_data: CreaturePackLoader;
    pack_renderer: CreatureHaxeBaseRenderer;
}

declare type CreatureDeformCompress = 'deform_comp1' | 'deform_comp2' | 'deform_comp1_1' | '';

declare class CreaturePackLoader {
    indices: number[];
    uvs: number[];
    points: number[];
    animClipMap: { [key: string]: CreaturePackAnimClip };
    headerList: any[];
    animPairsOffsetList: any[];
    dMinX: number;
    dMinY: number;
    dMaxX: number;
    dMaxY: number;
    fileData: number[];
    meshRegionsList: any[];

    constructor(bytesIn: any);

    formUndirectedGraph(): graphNode[];

    regionsDFS(graph: graphNode[], idx: number): graphNode[];
    findConnectedRegions(): graphNode[];
    updateIndices(idx: number);
    updatePoints(idx: number);
    updateUVs(idx: number);
    getAnimationNum(): number;
    hasDeformCompress(): CreatureDeformCompress;

    fillDeformRanges();
    finalAllPointSamples();

    getAnimationOffsets(idx: number): number[];
    getBaseOffset(): 0;
    getAnimPairsListOffset(): 1;
    getBaseIndicesOffset(): number;
    getBasePointsOffset(): number;
    getBaseUvsOffset(): number;
    getNumIndices(): number;
    getNumPoints(): number;
    getNumUvs(): number;
}

declare class CreatureHaxeBaseRenderer {
    data: any;
    isPlaying: boolean;
    isLooping: boolean;
    animBlendFactor: number;
    animBlendDelta: number;
    render_points: number[];
    render_uvs: number[];
    render_colors: number[];
    runTimeMap: {
        [key: string]: number
    };
    activeAnimationName: string;
    prevAnimationName: string;

    constructor(dataIn);

    createRuntimeMap();

    // Sets an active animation without blending
    setActiveAnimation(nameIn: string);

    // Smoothly blends to a target animation
    blendToAnimation(nameIn: string, blendDelta: number);

    setRunTime(timeIn: number);

    getRunTime(): number;

    // Steps the animation by a delta time
    stepTime(deltaTime: number);

    interpScalar(val1: number, val2: number, fraction: number);

    // Call this before a render to update the render data
    syncRenderData();
}

// use this to override what "make" function returns in Phaser.Scene class declaration
declare type PhaserGameObjectsCreatorWithCreature = Phaser.GameObjects.GameObjectCreator & { CreaturePackObj: CreatePackObjFunc };
