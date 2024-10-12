import { createSelector } from 'reselect';

//input selector coming from root reducer

const directorySelector = state=>state.directory;

//output selector

const directorySelectorSection = createSelector(
    [directorySelector],
    directory => directory.sections
)

export {
    directorySelectorSection
}