
---

TODO:
- Add a couple of (typed) MIXIN usage examples.
- Release as NPM package.
- And.. Then provide "data-signals-debug" which is a simple UX for displaying stuff.
    * Possibly made using MIX-DOM.
    * Then also expansion to include mix-dom host & components debugging.
    * The idea is simply to use a NEW WINDOW and handle its contents from the origin page.

## What is `data-signals`?

DataSignals (or `data-signals`) is a light weight library containing a few simple but carefully designed JS/TS classes, mixins and tools for managing complex state and action flow in sync.

The classes and methods are fully typed and commented. Accordingly the methods themselves can be used as documentation.

The npm package can be found with: [data-signals](https://www.npmjs.com/package/data-signals). Contribute in GitHub: [koodikulma-fi/data-signals.git](https://github.com/koodikulma-fi/data-signals.git)

---

## Documentation

### Basics - 3 main layers

#### 1. LIBRARY METHODS

A couple of data reusing concepts in the form of library methods.
- `DataTrigger` allows to trigger a callback when reference data is changed from last time - supporting various levels of comparison.
- `DataMemo` allows to recompute / reuse data based on arguments: when args change (according to comparison level), calls the producer callback to return new data.
- `DataPicker` is like DataMemo but with an extraction process in between, and always uses shallow comparison (of prev/next args) to trigger the producer callback.
- `DataSelector` functions exactly like DataSelector but uses multiple extractors: `(extractor1, extractor2, ..., producerCallback)`.

Also `areEqual(a, b)` and `deepCopy(anything)` methods with custom level of depth (-1) for deep supporting Objects, Arrays, Maps, Sets and recognizing class instances.


#### 2. SIMPLE MIXINS / CLASSES

A couple of mixins (+ stand alone class) for signalling and data listening features.
- `SignalMan` provides a service to attach listener callbacks to signals and then emit signals from the class - optionally supporting various data or sync related options.
- `DataBoy` provides data listening services, but without actually having any data.
- `DataMan` extends `DataBoy` to provide the actual data hosting and related methods.
- `SignalDataBoy` extends both `SignalMan` and `DataBoy`.
- `SignalDataMan` extends both `SignalMan` and `DataMan`.

Note. The mixins simply allow to extend an existing class with the mixin features - the result is a new custom made class.

#### 3. COMPLEX CLASSES

Finally, two classes specialized for complex data sharing situations, like those in modern web apps.
- `Context` extends `SignalDataMan` with syncing related settings. The contexts can also sync to the `ContextAPI`s that are listening to them.
- `ContextAPI` extends `SignalDataBoy` and accordingly allows to listen to data and signals in various named contexts.

The `ContextAPI` instance can also affect the syncing of `Context` refreshes - this is especially useful with the "delay" type of signals.
- For example, consider a state based rendering app, where you first set some data in context to trigger rendering ("pre-delay"), but want to send a signal only once the whole rendering is completed ("delay"). For example, the signal is meant for a component that was not there before state refresh.
- To solve it, the rendering hosts can simply use a connected contextAPI and override its `afterRefresh` method to await until rendering completed, making the "delay" be triggered only once the last of them completed. (The components may also use contextAPI, but typically won't affect the syncing.)

---

### SignalMan

- `SignalMan` provides signalling features, from simple instant void signals to complex synced awaiting getters.

```typescript

// Prepare signal typing.
type Signals = { doIt: (what: number) => void; whatIsLife: (whoAsks: string) => Promise<number>; };

// Create a SignalMan instance.
const signalMan = new SignalMan<Signals>();

// Listen to signals.
signalMan.listenTo("doIt", (what) => { console.log(what); });
signalMan.listenTo("whatIsLife", (whoAsks) => new Promise(res => res(whoAsks === "me" ? 0 : -1)));

// Send a signal.
signalMan.sendSignal("doIt", 5);

// Send a more complex signal.
const livesAre = await signalMan.sendSignalAs("await", "whatIsLife", "me"); // [0]
const lifeIsAfterAll = await signalMan.sendSignalAs(["await", "first"], "whatIsLife", "me"); // 0

```

---

### DataMan & DataBoy

- `DataBoy` simply provides data listening basis without having any data. (It's useful eg. for `ContextAPI`s.)
- `DataMan` completes the concept by providing the `data` member and the related methods for setting and getting data.

```typescript

// Create a DataMan instance.
const initialData = { something: { deep: true }, simple: "yes" };
const dataMan = new DataMan(initialData);

// Get data.
dataMan.getData(); // { something: { deep: true }, simple: "yes" }
dataMan.getInData("something.deep"); // true

// Listen to data.
dataMan.listenToData("something.deep", "simple", (deep, simple) => { console.log(deep, simple); });
dataMan.listenToData("something.deep", (deepOrFallback) => { }, [ "someFallback" ]); // Custom fallback if data is undefined.

// Trigger changes.
// .. At DataMan level, the data is refreshed instantly and optional timeouts are resolved separately.
// .. Note. The Contexts level has 0ms timeout by default and the refreshes are triggered all in sync.
dataMan.setData({ simple: "no" });
dataMan.setInData("something.deep", false);
dataMan.refreshData("something.deep"); // Trigger a refresh manually.
dataMan.refreshData(["something.deep", "simple"], 5); // Trigger a refresh after 5ms timeout.

```

---

### Context

- `Context` extends `SignalDataMan` and provides synced data refreshes and signalling.
- The data refreshes are triggered simultaneously after a common timeout (vs. separately at DataMan level), and default to 0ms timeout.
- The signalling part is synced to the refresh cycle using "pre-delay" and "delay" options.
    * The "pre-delay" is tied to context's own refresh cycle, defined by the `{ refreshTimeout: number | null; }` setting.
    * The "delay" happens after ("pre-delay" and) all the connected `ContextAPI` instances have refreshed (by their `afterRefresh` promise).

```typescript

// Prepare initial data and settings.
const initialData = { something: { deep: true }, simple: "yes" };
const settings: { refreshTimeout?: number | null; } = {}; // Defaults to 0ms, null means synchronous, undefined uses default.

// Extra typing - just to showcase Context<Data, Signals>.
type Data = typeof initialData;
type Signals = { doIt: (what: number) => void; whatIsLife: (whoAsks: string) => Promise<number>; };

// Create a context.
const myContext = new Context<Data, Signals>(initialData, settings);

// Get data.
myContext.getData(); // { something: { deep: true }, simple: "yes" }
myContext.getInData("something.deep"); // true

// Listen to data and signals.
myContext.listenToData("something.deep", "simple", (deep, simple) => { console.log(deep, simple); });
myContext.listenToData("something.deep", (deepOrFallback) => { }, [ "someFallback" ]); // Custom fallback if data is undefined.
myContext.listenTo("doIt", (what) => { console.log(what); });
myContext.listenTo("whatIsLife", (whoAsks) => new Promise(res => res(whoAsks === "me" ? 0 : -1)));

// Trigger changes.
// .. At Contexts level data refreshing uses 0ms timeout by default, and refreshes are always triggered all in sync.
myContext.setData({ simple: "no" });
myContext.setInData("something.deep", false);
myContext.refreshData("something.deep"); // Trigger a refresh manually.
myContext.refreshData(["something.deep", "simple"], 5); // Add keys and force the next cycle to be triggered after 5ms timeout.
myContext.refreshData(true, null); // Just refresh everything, and do it now (with `null` as the timeout).

// Send a signal.
myContext.sendSignal("doIt", 5);

// Send a more complex signal.
const livesAre = await myContext.sendSignalAs("await", "whatIsLife", "me"); // [0]
const lifeIsAfterAll = await myContext.sendSignalAs(["delay", "await", "first"], "whatIsLife", "me"); // 0
//
// <-- Using "pre-delay" ties to context's refresh cycle, while "delay" ties to once all related contextAPIs have refreshed.

```

---

### ContextAPI

- `ContextAPI` provides hooking communication with multiple _named_ `Context`s.
- When a ContextAPI is hooked up to a context, it can use its data and signalling services.
    * In this sense, ContextAPI provides an easy to use and stable reference to potentially changing set of contexts.
- Importantly the ContextAPIs also have `afterRefresh` method that returns a promise, which affects the "delay" cycle of Context refreshing.
    * By default the method resolves the promise instantly, but can be overridden to tie the syncing to other systems.
    * The "delay" cycle is resolved only once all the ContextAPIs connected to the refreshing context have resolved their `afterRefresh`.

```typescript

// Typing for multiple contexts.
type CtxSettingsData = { something: { deep: boolean; }; simple: string; };
type CtxUserData = { info: { name: string; avatar: string; }; };
type CtxUserSignals = {
    loggedIn: (userInfo: { name: string; avatar: string; }) => void;
    whatIsLife: (whoAsks: string) => Promise<number>;
};
type AllContexts = {
    settings: Context<CtxSettingsData>;
    user: Context<ContextUserData, ContextUserSignals>;
};

// Create a stand alone contextAPI instance.
const cApi = new contextAPI<AllContexts>();

// Get data.
cApi.getInData("settings"); // { something: { deep: true }, simple: "yes" } | undefined
cApi.getInData("settings.something.deep"); // true | undefined
cApi.getInData("settings.something.deep", [false]); // true | false

// Listen to data and signals.
cApi.listenToData("settings.something.deep", "simple", (deep, simple) => { console.log(deep, simple); });
cApi.listenToData("settings.something.deep", (deepOrFallback) => { }, [ "someFallback" ]); // Custom fallback if data is undefined.
cApi.listenTo("user.loggedIn", (userInfo) => { console.log(userInfo); }); // logs: { name, avatar }
cApi.listenTo("user.whatIsLife", (whoAsks) => new Promise(res => res(whoAsks === "me" ? 0 : -1)));

// Trigger changes.
// .. At Contexts level data refreshing uses 0ms timeout by default, and refreshes are always triggered all in sync.
cApi.setInData("settings", { simple: "no" }, true); // Extend.
cApi.setInData("settings.something.deep", false);
cApi.refreshData("settings.something.deep"); // Trigger a refresh manually.
cApi.refreshData(["settings.something.deep", "user.info"], 5); // Add keys and force the next cycle to be triggered after 5ms timeout.
cApi.refreshData(["settings", "user"], null); // Just refresh both contexts fully, and do it instantly (with `null` as the timeout).

// Send a signal.
cApi.sendSignal("user.loggedIn", { name: "Guest", avatar: "" });

// Send a more complex signal.
const livesAre = await cApi.sendSignalAs("await", "user.whatIsLife", "me"); // [0]
const lifeIsAfterAll = await cApi.sendSignalAs(["delay", "await", "first"], "user.whatIsLife", "me"); // 0
//
// <-- Using "pre-delay" ties to context's refresh cycle, while "delay" ties to once all related contextAPIs have refreshed.


```

---

### Selectors

- Selectors are especially useful in state based refreshing systems that compare previous and next state to determine refreshing needs.
- `createDataMemo` helps to reuse data in simple local usages. By default, it only computes the data if any of the arguments have changed.

```typescript

// Create a function that can be called to return updated data if arguments changed.
const myMemo = createDataMemo(
    // 1st arg is the producer callback that should return the desired data.
    // .. It's only triggered when either (a, b) is changed from last time.
    (a, b) => {
        // Do something with the args.
        return a.score > b.score ? { winner: a.name, loser: b.name } :
            a.score < b.score ? { winner: b.name, loser: a.name } : 
            { winner: null, loser: null };
    },
    // 2nd arg is optional and defines the _level of comparison_ referring to each argument.
    // .. For DataMemo it defaults to 0, meaning identity comparison on each argument: oldArg[i] !== newArg[i].
    // .. To do a deep comparison set to -1. Setting of 1 means shallow comparison (on each arg), and from there up.
    0,
);

// Use the memo.
const { winner, loser } = myMemo({ score: 3, name: "alpha"}, { score: 5, name: "beta" }); // { winner: "beta", loser: "alpha" }

```

- `createDataTrigger` is similar to DataMemo, but its purpose is to trigger a callback on mount.
- In addition, the mount callback can return another callback for unmounting, which is called if the mount callback gets overridden upon usage.

```typescript

// Create a function that can be called to trigger a callback when the reference data is changed from the last time
type Memory = { id: number; text: string; };
const myTrigger = createDataTrigger<Memory>(
    // 1st arg is an optional (but often used) _mount_ callback.
    (newMem, oldMem) => {
        // Run upon change.
        if (newMem.id !== oldMem.id)
            console.log("Id changed!");
        // Optionally return a callback to do _unmounting_.
        return (currentMem, nextMem) => { console.log("Unmounted!"); }
    },
    // 2nd arg is optional initial memory.
    // .. Use it to delay the first triggering of the mount callback (in case the same on first usages).
    { id: 5, text: "init" },
    // 3rd arg is optional depth, defaults to 1, meaning performs shallow comparison on the memory.
    1
);

// Use the trigger.
let didChange = myTrigger({ id: 5, text: "init" }); // false
didChange = myTrigger({ id: 5, text: "same old" }); // true
didChange = myTrigger({ id: 7, text: "changes" }); // true, logs: "Id changed!"
didChange = myTrigger({ id: 7, text: "changes" }, true); // true

// Change callback.
didChange = myTrigger({ id: 1, text: "changes" }, false, () => {
    if (newMem.id === oldMem.id)
        console.log("Id stayed!");
}); // true, logs: "Unmounted!" from the unmount callback above.
didChange = myTrigger({ id: 1, text: "now?" }); // true, logs: "Id stayed!"

```
- `createDataPicker` always receives `(...args)` and uses an extractor function to produce final arguments for the producer callback.
- The producer is triggered if the argument count or any argument value has changed: `newArgs.some((v, i) !== oldArgs[i])`.
- When used, the picker can receive multiple arguments, but in practice most often a single argument is given, eg. an immutable data state of a context or such.

```typescript

// Prepare.
type MyParams = [ colorTheme: { mode?: "light" | "dark" }, specialMode?: boolean];
type MyData = { theme: "dark" | "light"; special: boolean; }

// With pre-typing.
const codeViewDataPicker =
    (createDataPicker as CreateDataPicker<MyParams, MyData>)(
    // Extractor - showcases the usage for contexts.
    // .. For example, if has many usages with similar context data needs.
    (colorTheme, specialMode) => [
        colorTheme?.mode || "dark",
        specialMode || false,
    ],
    // Picker - it's only called if the extracted data items were changed from last time.
    (theme, special) => ({ theme, special })
);

// With manual typing.
const codeViewDataPicker_MANUAL = createDataPicker(
    // Extractor.
    (...[colorTheme, specialMode]: MyParams) => [
        colorTheme?.mode || "dark",
        specialMode || false,
    ],
    // Picker.
    (theme, special): MyData => ({ theme, special })
);

// Test.
const val = codeViewDataPicker({ mode: "dark" }, true);
const val_FAIL = codeViewDataPicker({ mode: "FAIL" }, true); // The "FAIL" is red-underlined.
const val_MANUAL = codeViewDataPicker_MANUAL({ mode: "dark" }, true);
const val_MANUAL_FAIL = codeViewDataPicker_MANUAL({ mode: "FAIL" }, true); // The "FAIL" is red-underlined.

```
- `createDataPicker` is exactly like DataPicker but uses an extractor function per output arument, instead of a single extractor.
- Likewise, the producer is triggered if the argument count or any argument value has changed: `newArgs.some((v, i) !== oldArgs[i])`.

```typescript

// Let' use the same MyParams and MyData as above.

// With pre-typing.
const codeViewDataSelector = (createDataSelector as CreateDataSelector<MyParams, MyData>)(
    // Extractors.
    [
        (colorTheme, _specialMode) => colorTheme?.mode || "dark",
        (_colorTheme_, specialMode) => specialMode || false,
    ],
    // Selector.
    (theme, special) => ({ theme, special })
);

// With manual typing.
const codeViewDataSelector_MANUAL = createDataSelector(
    // Extractors.
    [
        (colorTheme: { mode?: "light" | "dark" }, _specialMode: boolean) => colorTheme?.mode || "dark",
        (...[_colorTheme_, specialMode]: MyParams) => specialMode || false,
    ],
    // Selector.
    (theme, special): MyData => ({ theme, special })
);

// Test.
const sel = codeViewDataSelector({ mode: "dark" }, true);
const sel_FAIL = codeViewDataSelector({ mode: "FAIL" }, true); // Here only 1st arg is red-underlined.
const sel_MANUAL = codeViewDataSelector_MANUAL({ mode: "dark" }, true);
const sel_MANUAL_FAIL = codeViewDataSelector_MANUAL({ mode: "FAIL" }, true); // Both args are red-underlined.

```

---
