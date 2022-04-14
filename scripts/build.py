#!/usr/bin/env python

import os
import json
import shutil


def main():
    run_dir = os.getcwd()
    curr_dir = os.path.dirname(os.path.realpath(__file__))

    os.chdir(os.path.join(curr_dir, '..'))

    data = None
    with open(os.path.join(curr_dir, '..', 'build.json'), 'r') as f:
        data = json.load(f)

    dest = data['dest']
    src_dest = os.path.join(dest, 'src')
    build_dest = os.path.join(dest, 'bin')

    if os.path.exists(dest):
        shutil.rmtree(dest)

    if not os.path.exists(dest):
        os.makedirs(dest)
        os.makedirs(src_dest)
        os.makedirs(build_dest)

    for src in data['src']:

        f = src['src']
        d = src_dest

        if 'dest' in src.keys():
            d = os.path.join(d, src['dest'])

        if src['type'] == 'file':
            shutil.copyfile(f, os.path.join(d, os.path.basename(f)))
        
        if src['type'] == 'folder':
            shutil.copytree(f, d)


if __name__ == '__main__':
    main()
