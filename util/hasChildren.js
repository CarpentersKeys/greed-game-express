import isObject from "./isObject";

export default function hasChildren(sth) {
    if(!sth) {return false};
    return !! Array.isArray(sth) || isObject(sth);
}

