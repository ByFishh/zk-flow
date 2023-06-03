export interface Protocol {
  name: string;
  id: string;
  addresses: string[];
}

const availableProtocols: Protocol[] = [
  {
    name: 'Orbiter Finance',
    id: 'orbiter',
    addresses: [
      '0xe4edb277e41dc89ab076a1f049f4a3efa700bce8'.toLowerCase(),
      '0x80C67432656d59144cEFf962E8fAF8926599bCF8'.toLowerCase(),
    ],
  },
  {
    name: 'SyncSwap',
    id: 'syncswap',
    addresses: ['0x2da10A1e27bF85cEdD8FFb1AbBe97e53391C0295'.toLowerCase()],
  },
  {
    name: 'Mute.io',
    id: 'muteio',
    addresses: ['0x8B791913eB07C32779a16750e3868aA8495F5964'.toLowerCase()],
  },
  {
    name: 'Onchain Trade',
    id: 'onchaintrade',
    addresses: [
      '0x6219F06135b79705d34f5261852E9F6B98821E1f'.toLowerCase(),
      '0x8CB24Ab2f6A9171C0f9C5817D9F41De7C1Ce8b03'.toLowerCase(),
      '0x2a98158166BE71D21Dd97e248ba670211Df9a73C'.toLowerCase(),
      '0x84c18204c30da662562b7a2c79397C9E05f942f0'.toLowerCase(),
      '0xCa806B267fC0C1C12EdBF77A2E5bcA5939c7d953'.toLowerCase(),
      '0x10C8044Ae3f2B1C7decB439fF2dc1164D750C39D'.toLowerCase(),
      '0xE676B11421D68a28ba50920F2841183af93067a2'.toLowerCase(),
    ],
  },
  {
    name: 'zkSync Era Portal',
    id: 'zksynceraportal',
    addresses: ['0x000000000000000000000000000000000000800A'.toLowerCase()],
  },
  {
    name: 'zkSync Name Service',
    id: 'zksyncnameservice',
    addresses: ['0xAE23B6E7f91DDeBD3B70d74d20583E3e674Bd94f'.toLowerCase()],
  },
  {
    name: 'Maverick',
    id: 'maverick',
    addresses: [
      '0xFd54762D435A490405DDa0fBc92b7168934e8525'.toLowerCase(),
      '0x39E098A153Ad69834a9Dac32f0FCa92066aD03f4'.toLowerCase(),
    ],
  },
  {
    name: 'MintSquare',
    id: 'mintsquare',
    addresses: [
      '0x53eC17BD635F7A54B3551E76Fd53Db8881028fC3'.toLowerCase(),
      '0x6F6b9063097492CBb782EA8269cE11F411F03ee2'.toLowerCase(),
    ],
  },
  {
    name: 'Velocore',
    id: 'velocore',
    addresses: [
      '0xd06aD497EB89716B34a5EF6B9A2aA1Fb14A4c75e'.toLowerCase(),
      '0xD822315C30001bB85BAE8a9dE5dB98a87d0656d1'.toLowerCase(),
      '0xB2CEF7f2eCF1f4f0154D129C6e111d81f68e6d03'.toLowerCase(),
      '0xbdE345771Eb0c6adEBc54F41A169ff6311fE096F'.toLowerCase(),
      '0xD7107a47B4fBBc585b25BbEe3777B2EDC11D156C'.toLowerCase(),
      '0x0021C13C7bd19858E18EDdf54B82A6C7cd46cc96'.toLowerCase(),
      '0xe09A60FAe6d77658b9767A70e2f361b46Dd3f16A'.toLowerCase(),
      '0x8f0b4B3e211c84061ab5959Bd3D49C6B3EeC1d7D'.toLowerCase(),
      '0xc3e495312300Ee0A940889a5af0394F01BBA30E5'.toLowerCase(),
      '0x3E7b8C06626089ABeB52C6B5A9D97F893451A32c'.toLowerCase(),
      '0x389C30DafaEc0a0C637C33F39E1bDea75c4bA0e6'.toLowerCase(),
      '0x83CDDc0282D51d77d21e71190B02124D59f40918'.toLowerCase(),
      '0xEb669307ffd656a90E79a8AA5D635ad5f703a69f'.toLowerCase(),
      '0x06daed51a1Bfe51Ce90fCb0c11daB43999e42e30'.toLowerCase(),
      '0x2C63AC5D42Bd20aB6A2a5bdB2b2B29597fC5Df77'.toLowerCase(),
      '0x594b5927AAcEf79a1bfe72959D2DF7d122AFBd63'.toLowerCase(),
      '0xd999E16e68476bC749A28FC14a0c3b6d7073F50c'.toLowerCase(),
      '0x3355df6D4c9C3035724Fd0e3914dE96A5a83aaf4'.toLowerCase(),
    ],
  },
  {
    name: 'iZUMi finance',
    id: 'izumi',
    addresses: [
      '0x33D9936b7B7BC155493446B5E6dDC0350EB83AEC'.toLowerCase(),
      '0x7499ce9c8F4FF47Be5dd5308Ab54cC710DE751E1'.toLowerCase(),
      '0xBc94aedD2a0a986476b89e072B05e0Df117A3f8b'.toLowerCase(),
      '0xC319755Dff1601b3D0520B421A281B11bF22E80F'.toLowerCase(),
      '0x8df80089B7AB1646DB211D43949ECdfc94582011'.toLowerCase(),
      '0x0066f3791BD9d5a25d88F978dd8e1006445fE0d6'.toLowerCase(),
      '0x377EC7c9ae5a0787F384668788a1654249059dD6'.toLowerCase(),
      '0x3EC82C07981D6D213DA9bd35A0ba4cd324feA438'.toLowerCase(),
      '0x9606eC131EeC0F84c95D82c9a63959F2331cF2aC'.toLowerCase(),
      '0x936c9A1B8f88BFDbd5066ad08e5d773BC82EB15F'.toLowerCase(),
      '0x8b9D7D609a83B2f69D2135786a7D230043AF7283'.toLowerCase(),
      '0x7dEe7de9814ed6C1e20B3E4E2fA9b1B96E15FDe1'.toLowerCase(),
    ],
  },
  {
    name: 'SpaceFi',
    id: 'spacefi',
    addresses: [
      '0x0700Fb51560CfC8F896B2c812499D17c5B0bF6A7'.toLowerCase(),
      '0xE8826fC3cE6e74932144DBc2B369e7B52e88193A'.toLowerCase(),
      '0x7CF85F98C0339559eaB22DEea1E018721e800ADd'.toLowerCase(),
      '0xB376FceACd9FEF24A342645cBf72a4C439Ea0614'.toLowerCase(),
      '0xaCF5a67f2fCFEDA3946ccb1ad9d16d2Eb65c3c96'.toLowerCase(),
      '0x4Ad9Ee1698b6D521ebB2883Dd9FC3655C7553561'.toLowerCase(),
      '0x00f093Ff2bcA9DA894396336286c7c5Bd2310Ca5'.toLowerCase(),
      '0x307Baa142bA2BFA4A3059EFb631899c992a193EE'.toLowerCase(),
      '0x77d807B74d54b81a87A5769176Bc7719f676C8ce'.toLowerCase(),
      '0xbE7D1FD1f6748bbDefC4fbaCafBb11C6Fc506d1d'.toLowerCase(),
    ],
  },
  {
    name: 'GemSwap',
    id: 'gemswap',
    addresses: ['0x70B86390133d4875933bE54AE2083AAEbe18F2dA'.toLowerCase()],
  },
];

export { availableProtocols };
