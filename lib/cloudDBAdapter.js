const _0x5f2401 = _0x1b6d;
function _0x1b6d(_0x14980d, _0x2d4760) {
    _0x14980d = _0x14980d - (-0x1c * 0x13a + -0x2 * -0x1183 + -0x2d);
    const _0x382e86 = _0x514e();
    let _0x383a03 = _0x382e86[_0x14980d];
    return _0x383a03;
}
function _0x514e() {
    const _0x6975aa = [
        '468596AxypHT',
        'ByHNQ',
        '1052555USWiPq',
        'lVycN',
        'LRnOi',
        '8471890SFufBt',
        'GmEoB',
        'fetchOptions',
        'parse',
        '4495689JHTCDf',
        'body',
        'ulnQQ',
        'isArray',
        'RiRkT',
        'GET',
        'nTIwZ',
        'AKOZu',
        'hcwXV',
        '4821288lqHQZs',
        'Buffer',
        'ojFgL',
        'statusMessage',
        '1197879NIEGZR',
        'KrtBW',
        '8sgRQsB',
        'object',
        'aIlWc',
        'xxkNM',
        'qbBxL',
        'Invalid\x20URL\x20provided.',
        'YXUWa',
        'statusCode',
        'serialize',
        'message',
        '3dydXXv',
        'vrJSW',
        'Read\x20error:\x20',
        'OowCm',
        'application/json;q=0.9,text/plain',
        'POST',
        '4012235vmzVXj',
        'stringify',
        'RSXgh',
        '6RFBehn',
        'data',
        'YDquC',
        'type',
        'from',
        'url',
        'OjETv'
    ];
    _0x514e = function () {
        return _0x6975aa;
    };
    return _0x514e();
}
(function (_0x243c1d, _0x4cad5a) {
    const _0xd1cf57 = _0x1b6d, _0x83a7b = _0x243c1d();
    while (!![]) {
        try {
            const _0x3cf947 = parseInt(_0xd1cf57(0xad)) / (-0xb3 * -0x1 + -0x1ef5 * -0x1 + -0x3 * 0xa8d) * (-parseInt(_0xd1cf57(0x8b)) / (0x99f + -0x1f * -0xa9 + -0x1e14)) + parseInt(_0xd1cf57(0xa1)) / (0xb12 + -0x17 * 0x15a + -0x6ad * -0x3) * (-parseInt(_0xd1cf57(0xa3)) / (0x63f + -0x797 + 0x3 * 0x74)) + parseInt(_0xd1cf57(0x81)) / (0x2690 + 0x15f + -0x27ea) + -parseInt(_0xd1cf57(0x84)) / (-0x1080 + 0xa4d + 0x639) * (-parseInt(_0xd1cf57(0x8d)) / (-0x3f2 * 0x7 + 0xa47 * 0x1 + 0x115e)) + parseInt(_0xd1cf57(0x9d)) / (-0x267b * -0x1 + 0xc40 + 0x32b3 * -0x1) + -parseInt(_0xd1cf57(0x94)) / (-0xf61 + -0x24 * 0xae + 0x27e2) + parseInt(_0xd1cf57(0x90)) / (-0x3 * 0x391 + -0x829 * -0x3 + -0xdbe);
            if (_0x3cf947 === _0x4cad5a)
                break;
            else
                _0x83a7b['push'](_0x83a7b['shift']());
        } catch (_0x367d46) {
            _0x83a7b['push'](_0x83a7b['shift']());
        }
    }
}(_0x514e, -0x37569 + -0x3 * -0x2ae05 + 0x18c57));
import _0x3dcbb3 from 'got';
const stringify = _0x467a56 => JSON[_0x5f2401(0x82)](_0x467a56, null, -0x1 * -0x112 + -0x2115 * -0x1 + -0x1 * 0x2225), parse = _0x6c2b58 => JSON[_0x5f2401(0x93)](_0x6c2b58, (_0x5adb0f, _0x509b17) => {
        const _0x4179c1 = _0x5f2401, _0x275ba8 = {
                'vrJSW': _0x4179c1(0xa4),
                'tkyqD': function (_0x4e4442, _0x4fc64e) {
                    return _0x4e4442 in _0x4fc64e;
                },
                'IQrpT': _0x4179c1(0x87),
                'ulnQQ': function (_0xb0336f, _0x14930e) {
                    return _0xb0336f === _0x14930e;
                },
                'lVycN': _0x4179c1(0x85)
            };
        if (_0x509b17 !== null && typeof _0x509b17 === _0x275ba8[_0x4179c1(0xae)] && _0x275ba8['tkyqD'](_0x275ba8['IQrpT'], _0x509b17) && _0x275ba8[_0x4179c1(0x96)](_0x509b17['type'], _0x4179c1(0x9e)) && _0x275ba8[_0x4179c1(0x8e)] in _0x509b17 && Array[_0x4179c1(0x97)](_0x509b17[_0x4179c1(0x85)]))
            return Buffer[_0x4179c1(0x88)](_0x509b17[_0x4179c1(0x85)]);
        return _0x509b17;
    });
class CloudDBAdapter {
    constructor(_0x13c283, {
        serialize: serialize = stringify,
        deserialize: deserialize = parse,
        fetchOptions: fetchOptions = {}
    } = {}) {
        const _0x3989f2 = _0x5f2401, _0x2949c0 = { 'LRnOi': 'string' };
        if (typeof _0x13c283 !== _0x2949c0[_0x3989f2(0x8f)] || !/^https?:\/\//['test'](_0x13c283))
            throw new Error(_0x3989f2(0xa8));
        this[_0x3989f2(0x89)] = _0x13c283, this['serialize'] = serialize, this['deserialize'] = deserialize, this['fetchOptions'] = fetchOptions;
    }
    async ['read']() {
        const _0x4eb2f6 = _0x5f2401, _0x3ec279 = {
                'YDquC': function (_0x50ed50, _0x2525c4) {
                    return _0x50ed50 !== _0x2525c4;
                },
                'GmEoB': function (_0x3428a1, _0x2cb52e) {
                    return _0x3428a1 === _0x2cb52e;
                },
                'OjETv': _0x4eb2f6(0xa4),
                'ojFgL': function (_0x2f11fc, _0x1cb48d) {
                    return _0x2f11fc in _0x1cb48d;
                },
                'scEJW': _0x4eb2f6(0x87),
                'LsHrz': 'data',
                'KrtBW': function (_0x16f118, _0x1bc398, _0x51ee6e) {
                    return _0x16f118(_0x1bc398, _0x51ee6e);
                },
                'ByHNQ': _0x4eb2f6(0x99),
                'RSXgh': _0x4eb2f6(0xb1),
                'lrHlB': _0x4eb2f6(0xa6),
                'aIlWc': 'IJmCY'
            };
        try {
            const _0x38bdea = await _0x3ec279[_0x4eb2f6(0xa2)](_0x3dcbb3, this[_0x4eb2f6(0x89)], {
                'method': _0x3ec279[_0x4eb2f6(0x8c)],
                'headers': { 'Accept': _0x3ec279[_0x4eb2f6(0x83)] },
                ...this[_0x4eb2f6(0x92)]
            });
            if (_0x38bdea[_0x4eb2f6(0xaa)] !== -0x25b8 + -0x1443 + 0x3ac3)
                throw new Error(_0x38bdea['statusMessage']);
            return this['deserialize'](_0x38bdea['body']);
        } catch (_0x10d871) {
            if (_0x3ec279['YDquC'](_0x3ec279['lrHlB'], _0x3ec279[_0x4eb2f6(0xa5)]))
                throw new Error(_0x4eb2f6(0xaf) + _0x10d871['message']);
            else {
                if (_0x3ec279[_0x4eb2f6(0x86)](_0x3471e4, null) && _0x3ec279[_0x4eb2f6(0x91)](typeof _0x21686d, _0x3ec279[_0x4eb2f6(0x8a)]) && _0x3ec279[_0x4eb2f6(0x9f)](_0x3ec279['scEJW'], _0xa10573) && _0x3ec279[_0x4eb2f6(0x91)](_0x1cded6[_0x4eb2f6(0x87)], _0x4eb2f6(0x9e)) && _0x3ec279[_0x4eb2f6(0x9f)](_0x3ec279['LsHrz'], _0x3601dc) && _0x2be777[_0x4eb2f6(0x97)](_0x4d4f37['data']))
                    return _0x9b4174['from'](_0x20e91c['data']);
                return _0x75894c;
            }
        }
    }
    async ['write'](_0x5f59e0) {
        const _0x35a879 = _0x5f2401, _0x44370e = {
                'oJYkH': function (_0x179678, _0x8a1126) {
                    return _0x179678 === _0x8a1126;
                },
                'RiRkT': _0x35a879(0x9b),
                'nTIwZ': _0x35a879(0xa7),
                'YXUWa': function (_0x7e6a06, _0x45a07f, _0x5b3833) {
                    return _0x7e6a06(_0x45a07f, _0x5b3833);
                },
                'hcwXV': _0x35a879(0xb2),
                'OowCm': 'application/json'
            };
        try {
            if (_0x44370e['oJYkH'](_0x44370e[_0x35a879(0x98)], _0x44370e[_0x35a879(0x9a)]))
                return _0x44f71d[_0x35a879(0x88)](_0x6e1b3c[_0x35a879(0x85)]);
            else {
                const _0x3350b9 = await _0x44370e[_0x35a879(0xa9)](_0x3dcbb3, this[_0x35a879(0x89)], {
                    'method': _0x44370e[_0x35a879(0x9c)],
                    'headers': { 'Content-Type': _0x44370e[_0x35a879(0xb0)] },
                    ...this[_0x35a879(0x92)],
                    'body': this[_0x35a879(0xab)](_0x5f59e0)
                });
                if (_0x3350b9[_0x35a879(0xaa)] !== 0xe52 + -0x16 + -0xf6 * 0xe)
                    throw new Error(_0x3350b9[_0x35a879(0xa0)]);
                return _0x3350b9[_0x35a879(0x95)];
            }
        } catch (_0x340b12) {
            throw new Error('Write\x20error:\x20' + _0x340b12[_0x35a879(0xac)]);
        }
    }
}
export default CloudDBAdapter;