import { LocalAIIcon } from '~/common/components/icons/vendors/LocalAIIcon';

import type { IModelVendor } from '../IModelVendor';
import type { OpenAIAccessSchema } from '../../server/openai/openai.router';

import { DOpenAILLMOptions, ModelVendorOpenAI } from '../openai/openai.vendor';
import { OpenAILLMOptions } from '../openai/OpenAILLMOptions';

import { LocalAIServiceSetup } from './LocalAIServiceSetup';


interface DLocalAIServiceSettings {
  localAIHost: string;  // use OpenAI-compatible non-default hosts (full origin path)
  localAIKey: string;   // use OpenAI-compatible API keys
}

export const ModelVendorLocalAI: IModelVendor<DLocalAIServiceSettings, OpenAIAccessSchema, DOpenAILLMOptions> = {
  id: 'localai',
  name: 'LocalAI',
  displayRank: 50,
  location: 'local',
  instanceLimit: 4,
  hasBackendCapKey: 'hasLlmLocalAIHost',
  hasBackendCapFn: (backendCapabilities) => {
    // this is to show the green mark on the vendor icon in the setup screen
    return backendCapabilities.hasLlmLocalAIHost || backendCapabilities.hasLlmLocalAIKey;
  },

  // components
  Icon: LocalAIIcon,
  ServiceSetupComponent: LocalAIServiceSetup,
  LLMOptionsComponent: OpenAILLMOptions,

  // functions
  initializeSetup: () => ({
    localAIHost: '',
    localAIKey: '',
  }),
  getTransportAccess: (partialSetup) => ({
    dialect: 'localai',
    oaiKey: partialSetup?.localAIKey || '',
    oaiOrg: '',
    oaiHost: partialSetup?.localAIHost || '',
    heliKey: '',
    moderationCheck: false,
  }),

  // OpenAI transport ('localai' dialect in 'access')
  rpcUpdateModelsOrThrow: ModelVendorOpenAI.rpcUpdateModelsOrThrow,

};
