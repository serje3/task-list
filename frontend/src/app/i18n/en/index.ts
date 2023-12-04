import {nav} from './section/nav';
import {login} from '@app/i18n/en/section/login';
import {signup} from "@app/i18n/en/section/signup";
import {common} from "@app/i18n/en/section/common";
import {errors} from "@app/i18n/en/section/errors";
import {tasks} from "@app/i18n/en/section/tasks";

export const en_US = {
    ...nav,
    ...login,
    ...signup,
    ...common,
    ...errors,
    ...tasks,
};
