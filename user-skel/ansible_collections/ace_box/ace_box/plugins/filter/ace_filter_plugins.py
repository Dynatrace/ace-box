#!/usr/bin/python3

class FilterModule(object):
  ''' Nested dict filter '''

  def filters(self):
    return {
      'useCaseExtSrcToName': self.useCaseExtSrcToName,
      'useCaseExtSrcToConfigPath': self.useCaseExtSrcToConfigPath
    }

  def useCaseExtSrcToName(self, use_case_ext_src):
    slug = use_case_ext_src.split('/')[-1]
    return slug.replace('.git', '')

  def useCaseExtSrcToConfigPath(self, use_case_ext_src, ace_box_user):
    name = self.useCaseExtSrcToName(use_case_ext_src)
    return f'/home/{ace_box_user}/.ace/{name}.config.yml'
