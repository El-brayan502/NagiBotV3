(function (_0x2cf9fb, _0x5f05c7) {
    const _0x422359 = _0x32f5, _0x20265b = _0x2cf9fb();
    while (!![]) {
        try {
            const _0x2c4352 = -parseInt(_0x422359(0x105)) / (0xb * 0x20e + 0x19f6 + -0x1 * 0x308f) + -parseInt(_0x422359(0x129)) / (-0x21a * -0x1 + -0x174f + 0x1537) + parseInt(_0x422359(0x14e)) / (-0x23da + -0xfbc + 0x3399) * (-parseInt(_0x422359(0x14d)) / (-0x2 * 0x10 + -0x193 * -0x13 + 0x1 * -0x1dc5)) + -parseInt(_0x422359(0xcf)) / (-0x21f7 + 0x15 * 0x11c + 0xab0) * (parseInt(_0x422359(0xf6)) / (-0x4d5 + 0x1 * -0x1baa + 0x2085)) + -parseInt(_0x422359(0xde)) / (-0x268d + 0xe1e + 0x65 * 0x3e) * (parseInt(_0x422359(0x157)) / (-0x2 * -0x55b + -0x25 * -0xe1 + -0x2b33)) + parseInt(_0x422359(0xf0)) / (0x23c0 + -0x3 * -0xaed + -0x447e) + parseInt(_0x422359(0x143)) / (-0x24fc + -0x1d05 + 0x1d * 0x247);
            if (_0x2c4352 === _0x5f05c7)
                break;
            else
                _0x20265b['push'](_0x20265b['shift']());
        } catch (_0x399ee3) {
            _0x20265b['push'](_0x20265b['shift']());
        }
    }
}(_0x2330, 0x100071 + 0x2 * 0x87326 + -0x1 * 0x186ffd));
import _0x56a987 from 'axios';
import _0x5e1e55 from 'cheerio';
import _0x44037d from 'node-fetch';
import { sizeFormatter } from 'human-readable';
function _0x32f5(_0x1552ce, _0x264866) {
    _0x1552ce = _0x1552ce - (-0x779 + 0x3 * 0x843 + -0x1 * 0x1096);
    const _0x210be6 = _0x2330();
    let _0x488d2a = _0x210be6[_0x1552ce];
    return _0x488d2a;
}
import _0x53a580 from 'https';
async function joox(_0x9f71dd) {
    const _0xe175ea = _0x32f5, _0x1fad97 = {
            'vyHmu': _0xe175ea(0x12b),
            'MrrBe': function (_0x11a768, _0x5a4809) {
                return _0x11a768 === _0x5a4809;
            },
            'vIctA': _0xe175ea(0xc6),
            'ZnzjH': _0xe175ea(0xea),
            'vZeCq': function (_0x43e852, _0x40d31f) {
                return _0x43e852 / _0x40d31f;
            },
            'sighC': function (_0x5c7e88, _0x541a1f) {
                return _0x5c7e88 + _0x541a1f;
            },
            'jxFNE': _0xe175ea(0x117)
        };
    return new Promise((_0x4d4cab, _0x5b13ec) => {
        const _0x256b87 = _0xe175ea, _0x2edd0d = {
                'uuadw': _0x1fad97[_0x256b87(0x111)],
                'UZvLJ': function (_0x54166d, _0x42dc94) {
                    return _0x1fad97['MrrBe'](_0x54166d, _0x42dc94);
                },
                'EnYul': _0x256b87(0x120),
                'OtZoI': _0x1fad97['vIctA'],
                'wFQhr': _0x1fad97[_0x256b87(0x116)]
            }, _0x20854d = Math[_0x256b87(0xd2)](_0x1fad97[_0x256b87(0xd1)](new Date(), -0x2372 + -0x11 * 0x137 + -0x1 * -0x3c01));
        _0x56a987[_0x256b87(0x12d)](_0x1fad97[_0x256b87(0x137)]('http://api.joox.com/web-fcgi-bin//web_search?lang=id&country=id&type=0&search_input=' + _0x9f71dd, _0x1fad97[_0x256b87(0x123)]) + _0x20854d)['then'](({data: _0x22820d}) => {
            const _0x40232d = _0x256b87;
            if (_0x2edd0d['UZvLJ'](_0x2edd0d[_0x40232d(0x13c)], _0x2edd0d[_0x40232d(0x13c)])) {
                let _0x303e89 = [], _0x13e182 = [], _0x429328 = [], _0x437934 = [];
                _0x22820d[_0x40232d(0xe2)]['forEach'](_0x392516 => {
                    const _0x486b1c = _0x40232d;
                    _0x437934[_0x486b1c(0x121)](_0x392516[_0x486b1c(0xc5)]);
                });
                for (let _0xac0c9f = 0x22db + -0x1ba * -0x8 + -0x1 * 0x30ab; _0xac0c9f < _0x22820d['itemlist'][_0x40232d(0xc9)]; _0xac0c9f++) {
                    const _0x170933 = _0x2edd0d[_0x40232d(0x10e)] + _0x437934[_0xac0c9f];
                    _0x429328['push'](_0x56a987[_0x40232d(0x12d)](_0x170933, { 'headers': { 'Cookie': _0x2edd0d[_0x40232d(0x146)] } })[_0x40232d(0x140)](({data: _0x68580b}) => {
                        const _0x321dee = _0x40232d, _0x59c353 = JSON[_0x321dee(0xdb)](_0x68580b[_0x321dee(0x14b)](_0x2edd0d[_0x321dee(0x154)], '')[_0x321dee(0x14b)]('\x0a)', ''));
                        _0x13e182['push']({
                            'lagu': _0x59c353[_0x321dee(0xfd)],
                            'album': _0x59c353[_0x321dee(0xd7)],
                            'penyanyi': _0x59c353['msinger'],
                            'publish': _0x59c353['public_time'],
                            'img': _0x59c353[_0x321dee(0x10d)],
                            'mp3': _0x59c353[_0x321dee(0xbd)]
                        }), Promise[_0x321dee(0x11d)](_0x429328)[_0x321dee(0x140)](() => _0x4d4cab({
                            'creator': 'WH\x20MODS\x20DEV',
                            'status': !![],
                            'data': _0x13e182
                        }));
                    })[_0x40232d(0x11b)](_0x5b13ec));
                }
            } else
                _0x207227(_0x7f3e2f);
        })[_0x256b87(0x11b)](_0x5b13ec);
    });
}
async function fbdown(_0x140f1f) {
    const _0x22464d = _0x32f5, _0x473399 = {
            'iXeuH': function (_0x317dee, _0x5587b2) {
                return _0x317dee === _0x5587b2;
            },
            'XgxdZ': _0x22464d(0xe6),
            'dDxQN': _0x22464d(0xd5),
            'LpXuK': _0x22464d(0x113),
            'bcTZw': function (_0x3fb20e, _0x41544a, _0x15161a) {
                return _0x3fb20e(_0x41544a, _0x15161a);
            },
            'xALLp': function (_0x2f9125, _0x2f1b31) {
                return _0x2f9125(_0x2f1b31);
            },
            'cNOax': _0x22464d(0xf1),
            'FZqpt': function (_0x310b5d, _0x5ac984) {
                return _0x310b5d(_0x5ac984);
            },
            'gwoxQ': _0x22464d(0xbf),
            'XhHWz': 'href',
            'dnJmu': _0x22464d(0xd8),
            'PSJrW': _0x22464d(0x13b),
            'kjuGh': _0x22464d(0x119)
        };
    try {
        if (_0x473399['iXeuH'](_0x473399['dDxQN'], _0x473399[_0x22464d(0xe8)])) {
            const _0x831233 = {
                    'method': _0x473399[_0x22464d(0xd6)],
                    'body': new URLSearchParams({ 'URLz': _0x140f1f })
                }, _0x5d2d51 = await _0x473399[_0x22464d(0x10b)](_0x44037d, _0x22464d(0x101), _0x831233), _0x4ab7f9 = await _0x5d2d51[_0x22464d(0x122)](), _0x301694 = _0x5e1e55['load'](_0x4ab7f9);
            return {
                'title': _0x473399[_0x22464d(0x155)](_0x301694, _0x473399[_0x22464d(0x145)])[_0x22464d(0x122)]()[_0x22464d(0xeb)](),
                'description': _0x473399['FZqpt'](_0x301694, _0x22464d(0x104))[_0x22464d(0x122)]()['trim'](),
                'sdLink': _0x473399['xALLp'](_0x301694, _0x473399[_0x22464d(0x124)])[_0x22464d(0x149)](_0x473399[_0x22464d(0x127)]),
                'hdLink': _0x473399[_0x22464d(0xdc)](_0x301694, _0x473399['dnJmu'])[_0x22464d(0x149)](_0x473399[_0x22464d(0x127)])
            };
        } else
            _0x43282b[_0x3ed746[_0x22464d(0xe5)]] = _0x473399['iXeuH'](_0x3eadb7['Status'], _0x473399[_0x22464d(0xe7)]);
    } catch (_0x43946e) {
        if (_0x473399[_0x22464d(0xcd)](_0x473399[_0x22464d(0xca)], _0x473399[_0x22464d(0xca)]))
            return console['error'](_0x473399['kjuGh'], _0x43946e['message']), null;
        else {
            _0x5509d3[_0x22464d(0xc7)](_0x4449c7);
            throw _0x138998;
        }
    }
}
async function pinterest(_0x5cde4d) {
    const _0x3dfe33 = _0x32f5, _0x20652f = {
            'kDYWS': function (_0x4d5b29, _0x18ca11) {
                return _0x4d5b29 < _0x18ca11;
            },
            'hibaN': _0x3dfe33(0xc6),
            'SJkmB': 'wmid=142420656;\x20user_type=1;\x20country=id;\x20session_key=2a5d97d05dc8fe238150184eaf3519ad;',
            'OsAoR': 'RBOoJ',
            'iPutA': function (_0x351284, _0x284ca4) {
                return _0x351284(_0x284ca4);
            },
            'hSDvl': _0x3dfe33(0x11f),
            'WCzeH': _0x3dfe33(0xf3),
            'xIjXU': _0x3dfe33(0xd3),
            'rtkvW': function (_0x53e720, _0x373eef) {
                return _0x53e720 !== _0x373eef;
            },
            'hUUGH': 'hjmcR',
            'yjFnJ': _0x3dfe33(0x141),
            'hjrOm': _0x3dfe33(0xc8),
            'BTsLC': function (_0x23ee30, _0x54ecea, _0x51c922) {
                return _0x23ee30(_0x54ecea, _0x51c922);
            },
            'Izpeb': function (_0x72471b, _0x3251e1) {
                return _0x72471b(_0x3251e1);
            },
            'lUbHa': '_auth=1;\x20_b=\x22AXOtdcLOEbxD+qMFO7SaKFUCRcmtAznLCZY9V3z9tcTqWH7bPo637K4f9xlJCfn3rl4=\x22;\x20_pinterest_sess=TWc9PSZWcnpkblM5U1pkNkZ0dzZ6NUc5WDZqZEpGd2pVY3A0Y2VJOGg0a0J0c2JFWVpQalhWeG5iTTRJTmI5R08zZVNhRUZ4SmsvMG1CbjBWUWpLWVFDcWNnNUhYL3NHT1EvN3RBMkFYVUU0T0dIRldqVVBrenVpbGo5Q1lONHRlMzBxQTBjRGFSZnFBcTdDQVgrWVJwM0JtN3VRNEQyeUpsdDYreXpYTktRVjlxb0xNanBodUR1VFN4c2JUek1DajJXbTVuLzNCUDVwMmRlZW5VZVpBeFQ5ZC9oc2RnTGpEMmg4M0Y2N2RJeVo2aGNBYllUYjRnM05VeERzZXVRUVVYNnNyMGpBNUdmQ1dmM2s2M0txUHRuZTBHVFJEMEE1SnIyY2FTTm9DUEVTeWxKb3V0SW13bkV3TldyOUdrdUZaWGpzWmdaT0JlVnhWb29xWTZOTnNVM1NQSzViMkFUTjBpRitRRVMxaUFxMEJqell1bVduTDJid2l3a012RUgxQWhZT1M3STViSVkxV0dSb1p0NTBYcXlqRU5nPT0ma25kRitQYjZJNTVPb2tyVnVxSWlleEdTTkFRPQ==;\x20_ir=0',
            'MGduu': function (_0x570d6a, _0x2a5c6c) {
                return _0x570d6a(_0x2a5c6c);
            },
            'MUpTL': _0x3dfe33(0xed)
        };
    try {
        const _0x382ca8 = await _0x20652f[_0x3dfe33(0x128)](_0x44037d, _0x3dfe33(0xf2) + _0x20652f[_0x3dfe33(0x112)](encodeURIComponent, _0x5cde4d), { 'headers': { 'cookie': _0x20652f[_0x3dfe33(0x138)] } }), _0x385186 = await _0x382ca8[_0x3dfe33(0x122)](), _0x46f72c = _0x5e1e55[_0x3dfe33(0x151)](_0x385186), _0x3cddb3 = [], _0x23252f = [];
        return _0x20652f[_0x3dfe33(0x10c)](_0x46f72c, _0x20652f[_0x3dfe33(0x147)])['get']()[_0x3dfe33(0x132)](_0x4c96c4 => {
            const _0x6a7180 = _0x3dfe33, _0x537e85 = {
                    'GHhRO': function (_0x1798d6, _0x3390d5) {
                        const _0x3b0981 = _0x32f5;
                        return _0x20652f[_0x3b0981(0x142)](_0x1798d6, _0x3390d5);
                    },
                    'EmmmD': function (_0x230988, _0x572169) {
                        return _0x230988 + _0x572169;
                    },
                    'aCWwH': _0x20652f[_0x6a7180(0x158)],
                    'yCCux': _0x20652f[_0x6a7180(0xd0)]
                };
            if (_0x20652f[_0x6a7180(0x13e)] !== 'RBOoJ') {
                const _0x519ae8 = { 'IkQEv': 'MusicInfoCallback(' };
                let _0x1c2e36 = [], _0x5e459c = [], _0x2d4968 = [], _0x505fbe = [];
                _0x4e7f08['itemlist'][_0x6a7180(0x139)](_0x28185c => {
                    const _0x3c6309 = _0x6a7180;
                    _0x505fbe[_0x3c6309(0x121)](_0x28185c[_0x3c6309(0xc5)]);
                });
                for (let _0x3a76ef = 0x249b + -0x11 * 0x22e + -0x5 * -0x17; _0x537e85[_0x6a7180(0x153)](_0x3a76ef, _0x4be06a[_0x6a7180(0xe2)][_0x6a7180(0xc9)]); _0x3a76ef++) {
                    const _0x1e485a = _0x537e85[_0x6a7180(0x12e)](_0x537e85[_0x6a7180(0x118)], _0x505fbe[_0x3a76ef]);
                    _0x2d4968[_0x6a7180(0x121)](_0x4cf832[_0x6a7180(0x12d)](_0x1e485a, { 'headers': { 'Cookie': _0x537e85['yCCux'] } })[_0x6a7180(0x140)](({data: _0x4947f8}) => {
                        const _0x53c18c = _0x6a7180, _0x1dae4a = _0x515fa6['parse'](_0x4947f8[_0x53c18c(0x14b)](_0x519ae8['IkQEv'], '')['replace']('\x0a)', ''));
                        _0x5e459c[_0x53c18c(0x121)]({
                            'lagu': _0x1dae4a[_0x53c18c(0xfd)],
                            'album': _0x1dae4a[_0x53c18c(0xd7)],
                            'penyanyi': _0x1dae4a[_0x53c18c(0xfa)],
                            'publish': _0x1dae4a[_0x53c18c(0x152)],
                            'img': _0x1dae4a['imgSrc'],
                            'mp3': _0x1dae4a[_0x53c18c(0xbd)]
                        }), _0xfa7c02[_0x53c18c(0x11d)](_0x2d4968)[_0x53c18c(0x140)](() => _0x113013({
                            'creator': _0x53c18c(0x114),
                            'status': !![],
                            'data': _0x5e459c
                        }));
                    })[_0x6a7180(0x11b)](_0x25aced));
                }
            } else {
                const _0x242dac = _0x20652f[_0x6a7180(0xf8)](_0x46f72c, _0x4c96c4)[_0x6a7180(0xe9)](_0x20652f[_0x6a7180(0x14c)])[_0x6a7180(0x149)](_0x20652f[_0x6a7180(0x107)]);
                _0x3cddb3[_0x6a7180(0x121)](_0x242dac);
            }
        }), _0x3cddb3[_0x3dfe33(0x139)](_0x4f5fcb => {
            const _0x5ddb70 = _0x3dfe33, _0x643fe1 = {
                    'KVlMp': function (_0x33675d, _0xab805c) {
                        const _0x27214e = _0x32f5;
                        return _0x20652f[_0x27214e(0xf8)](_0x33675d, _0xab805c);
                    },
                    'baKQz': _0x20652f['WCzeH']
                };
            if (_0x20652f[_0x5ddb70(0xc1)](_0x20652f[_0x5ddb70(0x13d)], _0x20652f[_0x5ddb70(0xec)])) {
                if (_0x4f5fcb && _0x4f5fcb[_0x5ddb70(0x148)](_0x5ddb70(0xda))) {
                    if (_0x20652f[_0x5ddb70(0xc1)](_0x20652f[_0x5ddb70(0x130)], _0x5ddb70(0xc8))) {
                        const _0x31206e = _0x643fe1[_0x5ddb70(0x10f)](_0x584b49, _0x34336a)[_0x5ddb70(0xe9)](_0x5ddb70(0x11f))[_0x5ddb70(0x149)](_0x643fe1[_0x5ddb70(0xcc)]);
                        _0x790752['push'](_0x31206e);
                    } else
                        _0x23252f['push'](_0x4f5fcb[_0x5ddb70(0x14b)](/236/g, '736'));
                }
            } else
                _0x3c27a2[_0x5ddb70(0x121)](_0x20652f[_0x5ddb70(0xf8)](_0x222501, _0x4dd723)[_0x5ddb70(0xe9)](_0x20652f['hSDvl'])[_0x5ddb70(0x149)](_0x20652f['xIjXU']));
        }), _0x23252f['shift'](), _0x23252f;
    } catch (_0x3e7aec) {
        throw _0x3e7aec;
    }
}
function _0x2330() {
    const _0x4643b6 = [
        'msong',
        'pfMpa',
        'JEDEC',
        'https://www.wallpaperflare.com/search?wallpaper=',
        'https://fdown.net/download.php',
        'ID\x20Not\x20Found',
        'ZGgzR',
        '.lib-row.lib-desc',
        '802834dQsxFx',
        'Status',
        'WCzeH',
        'LHtZq',
        'post',
        'match',
        'bcTZw',
        'MGduu',
        'imgSrc',
        'OtZoI',
        'KVlMp',
        '&authuser=0&export=download',
        'vyHmu',
        'Izpeb',
        'POST',
        'WH\x20MODS\x20DEV',
        'https://trustpositif.kominfo.go.id/Rest_server/getrecordsname_home',
        'ZnzjH',
        '&pn=1&sin=0&ein=29&_=',
        'aCWwH',
        'Error:',
        'NumBV',
        'catch',
        'lvaXB',
        'all',
        'each',
        'img',
        'CcGhD',
        'push',
        'text',
        'jxFNE',
        'gwoxQ',
        'Agent',
        'content-type',
        'XhHWz',
        'BTsLC',
        '117330wyzpWl',
        'join',
        'MusicInfoCallback(',
        'UGgUg',
        'get',
        'EmmmD',
        'lHWnC',
        'hjrOm',
        'Link\x20Download\x20Limit!',
        'map',
        'CKG1yQEIkbbJAQiitskBCMS2yQEIqZ3KAQioo8oBGLeYygE=',
        'slice',
        'hwPFY',
        'log',
        'sighC',
        'lUbHa',
        'forEach',
        'href',
        'mEzYO',
        'EnYul',
        'hUUGH',
        'OsAoR',
        'ulfqH',
        'then',
        'EKAty',
        'kDYWS',
        '37353180ZwOcNC',
        'DxhdF',
        'cNOax',
        'wFQhr',
        'MUpTL',
        'includes',
        'attr',
        '_ga=GA1.2.863074474.1624987429;\x20_gid=GA1.2.857771494.1624987429;\x20__gads=ID=84d12a6ae82d0a63-2242b0820eca0058:T=1624987427:RT=1624987427:S=ALNI_MaJYaH0-_xRbokdDkQ0B49vSYgYcQ',
        'replace',
        'hSDvl',
        '3267164kiuIvC',
        '3LARaVq',
        'mZYZs',
        'MFLVD',
        'load',
        'public_time',
        'GHhRO',
        'uuadw',
        'xALLp',
        'kqhDa',
        '8TqNwHV',
        'hibaN',
        'link',
        'https://drive.google.com',
        'gzip,\x20deflate,\x20br',
        'https://www.musixmatch.com',
        'mp3Url',
        'pjpNN',
        '#sdlink',
        'DxiDp',
        'rtkvW',
        'pxGPR',
        'xCGCu',
        'lyrics',
        'songid',
        'http://api.joox.com/web-fcgi-bin/web_get_songinfo?songid=',
        'error',
        'TOAWI',
        'length',
        'PSJrW',
        'bRhcf',
        'baKQz',
        'iXeuH',
        'OgjMb',
        '475MlBWGf',
        'SJkmB',
        'vZeCq',
        'floor',
        'data-src',
        'Kufnr',
        'NhLbm',
        'LpXuK',
        'malbum',
        '#hdlink',
        'bsjVD',
        '236',
        'parse',
        'FZqpt',
        'application/x-www-form-urlencoded;charset=UTF-8',
        '7423997JIlWul',
        'isArray',
        'vhMqI',
        'values',
        'itemlist',
        'Mozilla/5.0\x20(Windows\x20NT\x2010.0;\x20Win64;\x20x64)\x20AppleWebKit/537.36\x20(KHTML,\x20like\x20Gecko)\x20Chrome/65.0.3325.181\x20Safari/537.36',
        'LoyAl',
        'Domain',
        'Ada',
        'XgxdZ',
        'dDxQN',
        'find',
        'wmid=142420656;\x20user_type=1;\x20country=id;\x20session_key=2a5d97d05dc8fe238150184eaf3519ad;',
        'trim',
        'yjFnJ',
        'div\x20>\x20a',
        'status',
        '736',
        '2376729JFCDwP',
        '.lib-row.lib-header',
        'https://id.pinterest.com/search/pins/?autologin=true&q=',
        'src',
        'YExTA',
        'rPxcP',
        '44580oYEkKd',
        'HODaW',
        'iPutA',
        'xEFFt',
        'msinger',
        'headers',
        'IqEUi'
    ];
    _0x2330 = function () {
        return _0x4643b6;
    };
    return _0x2330();
}
async function trustpositif(_0x6963bf) {
    const _0x4678eb = _0x32f5, _0x2ea07c = {
            'OgjMb': function (_0x58dec3, _0x1892e0) {
                return _0x58dec3(_0x1892e0);
            },
            'CAVPF': _0x4678eb(0x113),
            'YExTA': function (_0x1f052c, _0x4327f3) {
                return _0x1f052c === _0x4327f3;
            },
            'OvEED': 'Ada'
        };
    if (!_0x6963bf)
        return ![];
    let _0x24f874 = new _0x53a580[(_0x4678eb(0x125))]({ 'rejectUnauthorized': ![] });
    _0x6963bf = Array[_0x4678eb(0xdf)](_0x6963bf) ? encodeURIComponent(_0x6963bf[_0x4678eb(0x12a)]('\x0a')) : _0x6963bf;
    let {data: _0x5c4435} = await _0x2ea07c[_0x4678eb(0xce)](_0x56a987, {
            'url': _0x4678eb(0x115),
            'method': _0x2ea07c['CAVPF'],
            'httpsAgent': _0x24f874,
            'data': { 'name': _0x6963bf }
        }), _0x181961 = {};
    for (let _0x15dc8a of _0x5c4435[_0x4678eb(0xe1)]) {
        _0x181961[_0x15dc8a[_0x4678eb(0xe5)]] = _0x2ea07c[_0x4678eb(0xf4)](_0x15dc8a[_0x4678eb(0x106)], _0x2ea07c['OvEED']);
    }
    return _0x181961;
}
async function GDriveDl(_0x285b87) {
    const _0x869b2b = _0x32f5, _0x2d4f2e = {
            'kqhDa': function (_0x1a8f52, _0x4e5d54) {
                return _0x1a8f52(_0x4e5d54);
            },
            'xEFFt': _0x869b2b(0x102),
            'bsjVD': function (_0x993ec4, _0x232095, _0x2d7888) {
                return _0x993ec4(_0x232095, _0x2d7888);
            },
            'BSjUn': _0x869b2b(0x109),
            'xCGCu': _0x869b2b(0xdd),
            'mZYZs': _0x869b2b(0xba),
            'KTlcP': _0x869b2b(0xe3),
            'lvaXB': _0x869b2b(0x133),
            'ZGgzR': 'DriveWebUi',
            'pxGPR': 'true',
            'ulfqH': _0x869b2b(0x131),
            'hwPFY': _0x869b2b(0x126)
        };
    let _0x976bfd, _0x536b0b = { 'error': !![] };
    if (!(_0x285b87 && _0x285b87[_0x869b2b(0x10a)](/drive\.google/i)))
        return _0x536b0b;
    const _0x1df4a7 = _0x2d4f2e[_0x869b2b(0x156)](sizeFormatter, {
        'std': _0x869b2b(0xff),
        'decimalPlaces': 0x2,
        'keepTrailingZeroes': ![],
        'render': (_0x2ff3e1, _0x57d6d0) => _0x2ff3e1 + '\x20' + _0x57d6d0 + 'B'
    });
    try {
        _0x976bfd = (_0x285b87['match'](/\/?id=(.+)/i) || _0x285b87[_0x869b2b(0x10a)](/\/d\/(.*?)\//))[0xcfb + 0x131 * -0x16 + 0xd3c];
        if (!_0x976bfd)
            throw _0x2d4f2e[_0x869b2b(0xf9)];
        _0x536b0b = await _0x2d4f2e[_0x869b2b(0xd9)](_0x44037d, 'https://drive.google.com/uc?id=' + _0x976bfd + _0x869b2b(0x110), {
            'method': _0x2d4f2e['BSjUn'],
            'headers': {
                'accept-encoding': _0x869b2b(0xbb),
                'content-length': 0x0,
                'Content-Type': _0x2d4f2e[_0x869b2b(0xc3)],
                'origin': _0x2d4f2e[_0x869b2b(0x14f)],
                'user-agent': _0x2d4f2e['KTlcP'],
                'x-client-data': _0x2d4f2e[_0x869b2b(0x11c)],
                'x-drive-first-party': _0x2d4f2e[_0x869b2b(0x103)],
                'x-json-requested': _0x2d4f2e[_0x869b2b(0xc2)]
            }
        });
        let {
            fileName: _0x37c480,
            sizeBytes: _0x52b545,
            downloadUrl: _0xa41da
        } = JSON['parse']((await _0x536b0b[_0x869b2b(0x122)]())[_0x869b2b(0x134)](-0xc97 + 0x625 * -0x5 + -0x1 * -0x2b54));
        if (!_0xa41da)
            throw _0x2d4f2e[_0x869b2b(0x13f)];
        let _0x626f61 = await _0x44037d(_0xa41da);
        if (_0x626f61[_0x869b2b(0xee)] !== 0x1 * 0x2493 + -0xf6 * -0x3 + 0x1 * -0x26ad)
            return _0x626f61['statusText'];
        return {
            'downloadUrl': _0xa41da,
            'fileName': _0x37c480,
            'fileSize': _0x2d4f2e[_0x869b2b(0x156)](_0x1df4a7, _0x52b545),
            'mimetype': _0x626f61[_0x869b2b(0xfb)]['get'](_0x2d4f2e[_0x869b2b(0x135)])
        };
    } catch (_0x278e92) {
        return console[_0x869b2b(0x136)](_0x278e92), _0x536b0b;
    }
}
async function lirik(_0x48b26b) {
    const _0x54b86a = _0x32f5, _0xf34fb8 = {
            'EQkLY': _0x54b86a(0x12f),
            'vhMqI': _0x54b86a(0xd4),
            'MFLVD': function (_0x90e5fb, _0x584beb) {
                return _0x90e5fb + _0x584beb;
            },
            'DxhdF': function (_0x23c1eb, _0x523122) {
                return _0x23c1eb(_0x523122);
            },
            'NumBV': _0x54b86a(0x13a),
            'rPxcP': '.lyrics__content__ok',
            'LHtZq': function (_0x2cc18b, _0x569e26) {
                return _0x2cc18b(_0x569e26);
            }
        };
    return new Promise(async (_0x4f9ac8, _0x20e822) => {
        const _0x36f823 = _0x54b86a;
        if (_0xf34fb8['EQkLY'] !== _0xf34fb8[_0x36f823(0xe0)])
            try {
                const {data: _0x105aa5} = await _0x56a987[_0x36f823(0x12d)](_0xf34fb8[_0x36f823(0x150)]('https://www.musixmatch.com/search/', _0x48b26b)), _0x5e82c0 = _0x5e1e55['load'](_0x105aa5), _0x1f33b7 = {};
                let _0x169915 = _0x36f823(0xbc);
                const _0x4a717e = _0x169915 + _0xf34fb8['DxhdF'](_0x5e82c0, 'div.media-card-body\x20>\x20div\x20>\x20h2')[_0x36f823(0xe9)]('a')['attr'](_0xf34fb8[_0x36f823(0x11a)]), {data: _0x566000} = await _0x56a987[_0x36f823(0x12d)](_0x4a717e), _0x27bdec = _0x5e1e55[_0x36f823(0x151)](_0x566000);
                _0x1f33b7[_0x36f823(0xc4)] = _0x27bdec(_0xf34fb8[_0x36f823(0xf5)])[_0x36f823(0x122)]()[_0x36f823(0xeb)](), _0x1f33b7[_0x36f823(0x159)] = _0x4a717e, _0xf34fb8[_0x36f823(0x108)](_0x4f9ac8, _0x1f33b7);
            } catch (_0x58ddfe) {
                _0xf34fb8[_0x36f823(0x144)](_0x20e822, _0x58ddfe);
            }
        else
            _0x12a440[_0x36f823(0x121)](_0xf9acbc['replace'](/236/g, _0x36f823(0xef)));
    });
}
async function wallpaper(_0x4061f0) {
    const _0x11f2ab = _0x32f5, _0x5e3864 = {
            'UIuwZ': function (_0x2a6a0d, _0x5c4316) {
                return _0x2a6a0d(_0x5c4316);
            },
            'JOnCN': _0x11f2ab(0x11f),
            'bRhcf': _0x11f2ab(0xd3),
            'IqEUi': _0x11f2ab(0x12b),
            'vVjil': _0x11f2ab(0x100),
            'LoyAl': 'Mozilla/5.0\x20(Windows\x20NT\x2010.0;\x20Win64;\x20x64)\x20AppleWebKit/537.36\x20(KHTML,\x20like\x20Gecko)\x20Chrome/91.0.4472.124\x20Safari/537.36',
            'HODaW': _0x11f2ab(0x14a),
            'UGgUg': '#gallery\x20>\x20li\x20>\x20figure\x20>\x20a',
            'XCCjX': function (_0x95e188, _0x176c7b) {
                return _0x95e188 !== _0x176c7b;
            },
            'pjpNN': _0x11f2ab(0xc0)
        };
    try {
        const {data: _0x195b59} = await _0x56a987[_0x11f2ab(0x12d)](_0x5e3864['vVjil'] + _0x4061f0, {
                'headers': {
                    'user-agent': _0x5e3864[_0x11f2ab(0xe4)],
                    'cookie': _0x5e3864[_0x11f2ab(0xf7)]
                }
            }), _0x43b5e8 = _0x5e1e55[_0x11f2ab(0x151)](_0x195b59), _0x471392 = [];
        return _0x43b5e8(_0x5e3864[_0x11f2ab(0x12c)])[_0x11f2ab(0x11e)](function (_0x48351a, _0x14f991) {
            const _0x27633d = _0x11f2ab;
            _0x471392[_0x27633d(0x121)](_0x5e3864['UIuwZ'](_0x43b5e8, _0x14f991)[_0x27633d(0xe9)](_0x5e3864['JOnCN'])['attr'](_0x5e3864[_0x27633d(0xcb)]));
        }), _0x471392;
    } catch (_0x4f3fa5) {
        if (_0x5e3864['XCCjX'](_0x5e3864[_0x11f2ab(0xbe)], _0x11f2ab(0xfe))) {
            console[_0x11f2ab(0xc7)](_0x4f3fa5);
            throw _0x4f3fa5;
        } else {
            const _0x3d57d7 = _0x5634b9[_0x11f2ab(0xdb)](_0x586a63[_0x11f2ab(0x14b)](_0x5e3864[_0x11f2ab(0xfc)], '')[_0x11f2ab(0x14b)]('\x0a)', ''));
            _0x1e2498[_0x11f2ab(0x121)]({
                'lagu': _0x3d57d7[_0x11f2ab(0xfd)],
                'album': _0x3d57d7[_0x11f2ab(0xd7)],
                'penyanyi': _0x3d57d7[_0x11f2ab(0xfa)],
                'publish': _0x3d57d7['public_time'],
                'img': _0x3d57d7[_0x11f2ab(0x10d)],
                'mp3': _0x3d57d7['mp3Url']
            }), _0x3b8363[_0x11f2ab(0x11d)](_0x35f263)[_0x11f2ab(0x140)](() => _0x373052({
                'creator': 'WH\x20MODS\x20DEV',
                'status': !![],
                'data': _0x19d81c
            }));
        }
    }
}
export {
    joox,
    fbdown,
    pinterest,
    trustpositif,
    GDriveDl,
    lirik,
    wallpaper
};