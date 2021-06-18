import React from 'react';

import '~assets/styles/fonts.g.scss';


export default function Icons({ prefix, name, pathNumber }: { prefix: string, name: string, pathNumber: number }) {
  const paths = Array.from({ length: pathNumber }, (v, i) => <span className={`path${i + 1}`}/>);
  return (
    <span className={`${prefix}-${name}`}>
      {paths}
    </span>
  );
}

export type OfficeXSIconNameType = 'info' | 'toolbox' | 'mailbox' | 'idea' | 'menu' | 'home'
  | 'briefcase' | 'checked' | 'cancel' | 'support' | 'services' | 'folder'
  | 'search' | 'refresh' | 'plus' | 'edit' | 'delete' | 'bookmark';

const OfficeXSIconsPathNumber = {
  'info': 3,
  'toolbox': 9,
  'mailbox': 14,
  'idea': 6,
  'menu': 6,
  'home': 7,
  'briefcase': 6,
  'checked': 3,
  'cancel': 4,
  'support': 4,
  'services': 6,
  'folder': 4,
  'search': 4,
  'refresh': 4,
  'plus': 4,
  'edit': 9,
  'delete': 2,
  'bookmark': 2
};

Icons.OfficeXS = function ({ name }: { name: OfficeXSIconNameType }) {
  return <Icons prefix="icon-office-xs" name={name} pathNumber={OfficeXSIconsPathNumber[name]}/>;
};


export type CircleBubblesIconNameType = 'checked' | 'home' | 'sun' | 'menu' | 'briefcase' | 'services'
  | 'folder' | 'document' | 'share' | 'search' | 'plus' | 'edit' | 'delete' | 'bookmark';

const CircleBubblesIconsPathNumber = {
  'checked': 16,
  'home': 27,
  'sun': 25,
  'menu': 19,
  'briefcase': 31,
  'services': 30,
  'folder': 17,
  'document': 23,
  'share': 27,
  'search': 25,
  'plus': 14,
  'edit': 26,
  'delete': 17,
  'bookmark': 17
};

Icons.CircleBubble = function ({ name }: { name: CircleBubblesIconNameType }) {
  return <Icons prefix="icon-circle-bubbles" name={name} pathNumber={CircleBubblesIconsPathNumber[name]}/>;
};

export type FluentSystemIconNameType = 'toolbox' | 'idea' | 'menu' | 'home'
  | 'briefcase' | 'clock' | 'services' | 'puzzle' | 'folder' | 'plus'
  | 'hexagon-reload' | 'edit' | 'delete' | 'connect' | 'bookmark' | 'add-bookmark';


Icons.FluentSystem = function ({ name }: { name: FluentSystemIconNameType }) {
  return <Icons prefix="icon-fluent-system" name={name} pathNumber={0}/>;
};