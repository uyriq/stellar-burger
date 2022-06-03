// lib/things/index.js

import boxcss from './box.css'
import { ArrowDownIcon } from './icons/arrow-down-icon';
import { ArrowUpIcon } from './icons/arrow-up-icon';
import { BurgerIcon } from './icons/burger-icon';
import { CheckMarkIcon } from './icons/check-mark-icon';
import { CloseIcon } from './icons/close-icon';
import { CurrencyIcon } from './icons/currency-icon';
import { DeleteIcon } from './icons/delete-icon';
import { DragIcon } from './icons/drag-icon';
import { EditIcon } from './icons/edit-icon';
import { HideIcon } from './icons/hide-icon';
import { InfoIcon } from './icons/info-icon';
import { ListIcon } from './icons/list-icon';
import { LockIcon } from './icons/lock-icon';
import { LogoutIcon } from './icons/logout-icon';
import { MenuIcon } from './icons/menu-icon';
import { ProfileIcon } from './icons/profile-icon';
import { ShowIcon } from './icons/show-icon';
import { TIconProps } from './icons/utils';

import { Button } from './button'
import { ConstructorElement } from './constructor-element'
import { Counter } from './counter'
import { EmailInput } from './email-input'
import { Input } from './input'
import { Logo } from './logo'
import { PasswordInput } from './password-input'
import { Tab } from './tab'
export type TICons = {
    CurrencyIcon: React.FC<TIconProps>;
    BurgerIcon: React.FC<TIconProps>;
    LockIcon: React.FC<TIconProps>;
    DragIcon: React.FC<TIconProps>;
    DeleteIcon: React.FC<TIconProps>;
    ArrowUpIcon: React.FC<TIconProps>;
    ArrowDownIcon: React.FC<TIconProps>;
    MenuIcon: React.FC<TIconProps>;
    CloseIcon: React.FC<TIconProps>;
    CheckMarkIcon: React.FC<TIconProps>;
    ListIcon: React.FC<TIconProps>;
    ProfileIcon: React.FC<TIconProps>;
    EditIcon: React.FC<TIconProps>;
    InfoIcon: React.FC<TIconProps>;
    ShowIcon: React.FC<TIconProps>;
    HideIcon: React.FC<TIconProps>;
    LogoutIcon: React.FC<TIconProps>;
};


export  {
ArrowDownIcon,
ArrowUpIcon,
BurgerIcon,
CheckMarkIcon,
CloseIcon,
CurrencyIcon,
DeleteIcon,
DragIcon,
EditIcon,
HideIcon,
InfoIcon,
ListIcon,
LockIcon,
LogoutIcon,
MenuIcon,
ProfileIcon,
ShowIcon,

Button,
ConstructorElement,
Counter,
EmailInput,
Input,
Logo,
PasswordInput,
Tab,
boxcss
}
