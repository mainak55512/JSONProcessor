function getParmKeys(field_str) {
	let keys = [field_str];
	if (field_str.indexOf('.') > -1) {
		keys = field_str.split(".");
	}
	return keys;
}
export function getLastKey(field_str) {
	let keys = getParmKeys(field_str);
	return keys[keys.length - 1];
}
export function getValueFromObj(obj, field_str) {
	let keys = getParmKeys(field_str);
	let value = obj;
	keys.forEach(function(key) {
		value = value[key];
	});
	return value;
}
