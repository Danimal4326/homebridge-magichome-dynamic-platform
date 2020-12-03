import { HomebridgeMagichomeDynamicPlatformAccessory } from '../platformAccessory';
import { ILightState } from '../magichome-interface/types';
import Common from './common'; 
import { cloneDeep } from 'lodash'; 
export class RGBWWStrip extends HomebridgeMagichomeDynamicPlatformAccessory {
  
  addHomekitProps(state:ILightState):void {
    Common.convertRGBWWtoHSB(state, this as any);
    return;
  }

  addMagicHomeProps(state:ILightState):void {
    Common.convertHSBtoRGBWW(state, this as any);
    return;
  }

  async updateDeviceState(_timeout = 200, lockedState:ILightState) {
    this.addMagicHomeProps(lockedState);
    this.lightLastWrittenState = cloneDeep(lockedState);   
    const { r, g, b, ww, cw, mask } = Common.flattenLightState(lockedState);
    this.send([0x31, r, g, b, ww, cw, mask, 0x0F], true, _timeout);
  }
  
}