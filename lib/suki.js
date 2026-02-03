function _0x18d1(_0x462def, _0x3c738a) {
    _0x462def = _0x462def - (-0x1 * 0x2531 + 0x3 * 0x8fd + 0xc2a);
    const _0x351685 = _0x52b8();
    let _0x1c4e5e = _0x351685[_0x462def];
    return _0x1c4e5e;
}
(function (_0x1bdfb5, _0x5ab22d) {
    const _0x497a5e = _0x18d1, _0x56bf2 = _0x1bdfb5();
    while (!![]) {
        try {
            const _0x160cb2 = -parseInt(_0x497a5e(0x1f5)) / (-0xd * -0x243 + 0x21ec + -0x3f52) * (-parseInt(_0x497a5e(0x1f2)) / (0x1212 + 0x1 * 0x5da + -0x17ea)) + parseInt(_0x497a5e(0x20d)) / (0x1ff6 + -0x1fe6 + -0xd) * (-parseInt(_0x497a5e(0x204)) / (0x1324 + -0x1 * 0xb6 + -0x126a * 0x1)) + parseInt(_0x497a5e(0x1f4)) / (-0x120 * -0x15 + -0x29 * -0xbd + -0x35e * 0x10) + parseInt(_0x497a5e(0x1f0)) / (0x1f * 0xe9 + 0x5 * 0x49 + -0x1d9e) + parseInt(_0x497a5e(0x1f6)) / (-0x8bc + 0x15 * -0x161 + 0x88 * 0x47) * (-parseInt(_0x497a5e(0x1fc)) / (-0x120a + -0x531 + 0x18d * 0xf)) + -parseInt(_0x497a5e(0x203)) / (-0x317 * 0xc + 0x1cc7 + -0x42b * -0x2) * (parseInt(_0x497a5e(0x206)) / (-0x1791 + 0x3 * -0x27e + -0x1f15 * -0x1)) + -parseInt(_0x497a5e(0x1fd)) / (-0xc98 * -0x2 + -0x4bb * 0x1 + -0x146a) * (-parseInt(_0x497a5e(0x1ff)) / (-0x1 * -0x331 + -0x26b6 + -0xf * -0x25f));
            if (_0x160cb2 === _0x5ab22d)
                break;
            else
                _0x56bf2['push'](_0x56bf2['shift']());
        } catch (_0x3c24c3) {
            _0x56bf2['push'](_0x56bf2['shift']());
        }
    }
}(_0x52b8, 0x16654b + 0x74148 + -0x112ed1));
import _0x4ab71f from 'node-fetch';
import _0x3f5251 from 'form-data';
function _0x52b8() {
    const _0x5b9547 = [
        'Unsupported\x20file\x20type',
        '300JrGfBU',
        'file',
        'mime',
        'split',
        'DfLVb',
        'isBuffer',
        '3866538aQVtXa',
        'shift',
        '6892ClUSXX',
        'url',
        '7818890XWVPut',
        '48Wfkfbu',
        '19649TostXP',
        'Invalid\x20buffer\x20format',
        'isArray',
        'Nnfvv',
        'application/json',
        'POST',
        '4552nnigii',
        '11LssWmy',
        'message',
        '11087304bUvuct',
        'https://api.ryzendesu.vip/api/uploader/ryzencdn',
        'getHeaders',
        'ext',
        '1922301tqedot',
        '18244SBGVxA',
        'Upload\x20failed',
        '20hlFlVH',
        'rmKEf',
        'map',
        'FWiTc',
        'append',
        'NagiCDN\x20Error:\x20'
    ];
    _0x52b8 = function () {
        return _0x5b9547;
    };
    return _0x52b8();
}
import { fileTypeFromBuffer } from 'file-type';
const ryzenCDN = async _0xb76c06 => {
    const _0x3b7ba8 = _0x18d1, _0x11a696 = {
            'HuaHL': _0x3b7ba8(0x1f7),
            'FWiTc': function (_0x45709e, _0x197fa0) {
                return _0x45709e(_0x197fa0);
            },
            'Nnfvv': _0x3b7ba8(0x20c),
            'rmKEf': function (_0x29e0dc, _0x5ec26f, _0x530128) {
                return _0x29e0dc(_0x5ec26f, _0x530128);
            },
            'DfLVb': _0x3b7ba8(0x200),
            'ZFoaX': _0x3b7ba8(0x1fb),
            'kQUQg': _0x3b7ba8(0x1fa)
        };
    try {
        const _0x26b380 = new _0x3f5251(), _0x4481ee = Array[_0x3b7ba8(0x1f8)](_0xb76c06) ? _0xb76c06 : [_0xb76c06];
        for (const _0x353c9c of _0x4481ee) {
            const _0x46907b = Buffer[_0x3b7ba8(0x212)](_0x353c9c) ? _0x353c9c : _0x353c9c['buffer'];
            if (!Buffer['isBuffer'](_0x46907b))
                throw new Error(_0x11a696['HuaHL']);
            const _0x43b1e9 = await _0x11a696[_0x3b7ba8(0x209)](fileTypeFromBuffer, _0x46907b);
            if (!_0x43b1e9)
                throw new Error(_0x11a696[_0x3b7ba8(0x1f9)]);
            const _0x44d63d = (_0x353c9c['originalname'] || _0x3b7ba8(0x20e))[_0x3b7ba8(0x210)]('.')[_0x3b7ba8(0x1f1)]();
            _0x26b380[_0x3b7ba8(0x20a)]('file', _0x46907b, {
                'filename': _0x44d63d + '.' + _0x43b1e9[_0x3b7ba8(0x202)],
                'contentType': _0x43b1e9[_0x3b7ba8(0x20f)]
            });
        }
        const _0x338b23 = await _0x11a696[_0x3b7ba8(0x207)](_0x4ab71f, _0x11a696[_0x3b7ba8(0x211)], {
                'method': _0x11a696['ZFoaX'],
                'headers': {
                    'accept': _0x11a696['kQUQg'],
                    ..._0x26b380[_0x3b7ba8(0x201)]()
                },
                'body': _0x26b380
            }), _0xe89a76 = await _0x338b23['json']();
        if (!_0xe89a76['success'])
            throw new Error(_0xe89a76['message'] || _0x3b7ba8(0x205));
        return Array[_0x3b7ba8(0x1f8)](_0xb76c06) ? _0xe89a76[_0x3b7ba8(0x208)](_0x5f0b6b => _0x5f0b6b[_0x3b7ba8(0x1f3)]) : _0xe89a76;
    } catch (_0x4e29f3) {
        throw new Error(_0x3b7ba8(0x20b) + _0x4e29f3[_0x3b7ba8(0x1fe)]);
    }
};
export {
    ryzenCDN
};