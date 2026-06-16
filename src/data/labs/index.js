import lab01 from './lab01'
import lab02 from './lab02'
import lab03 from './lab03'
import lab04 from './lab04'
import lab05 from './lab05'
import lab06 from './lab06'
import lab07 from './lab07'
import lab08 from './lab08'
import lab09 from './lab09'
import lab10 from './lab10'
import lab11 from './lab11'
import lab12 from './lab12'
import lab13 from './lab13'
import lab14 from './lab14'

export const labs = [
  lab01, lab02, lab03, lab04, lab05, lab06, lab07,
  lab08, lab09, lab10, lab11, lab12, lab13, lab14,
]

export const DEFAULT_ENABLED_LAB_IDS = [1]

export function getEnabledLabs(enabledLabIds = DEFAULT_ENABLED_LAB_IDS) {
  return labs.filter((lab) => enabledLabIds.includes(lab.id))
}

export function isLabIdEnabled(labId, enabledLabIds = DEFAULT_ENABLED_LAB_IDS) {
  return enabledLabIds.includes(labId)
}
