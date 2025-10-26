/************************************************************************
 * This file is part of TPDCRM.
 *
 * TPDCRM – Open Source CRM application.
 * Copyright (C) 2014-2025 TPDCRM, Inc.
 * Website: https://www.TPDCRM.com
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <https://www.gnu.org/licenses/>.
 *
 * The interactive user interfaces in modified source and object code versions
 * of this program must display Appropriate Legal Notices, as required under
 * Section 5 of the GNU Affero General Public License version 3.
 *
 * In accordance with Section 7(b) of the GNU Affero General Public License version 3,
 * these Appropriate Legal Notices must retain the display of the "TPDCRM" word.
 ************************************************************************/

import BaseRecordView from 'views/record/base';

class EditStreamView extends BaseRecordView {

    template = 'stream/record/edit'

    postingMode = false

    dependencyDefs = {
        'targetType': {
            map: {
                'users': [
                    {
                        action: 'hide',
                        fields: ['teams', 'portals']
                    },
                    {
                        action: 'show',
                        fields: ['users']
                    },
                    {
                        action: 'setNotRequired',
                        fields: ['teams', 'portals']
                    },
                    {
                        action: 'setRequired',
                        fields: ['users']
                    }
                ],
                'teams': [
                    {
                        action: 'hide',
                        fields: ['users', 'portals']
                    },
                    {
                        action: 'show',
                        fields: ['teams']
                    },
                    {
                        action: 'setRequired',
                        fields: ['teams']
                    },
                    {
                        action: 'setNotRequired',
                        fields: ['users', 'portals']
                    }
                ],
                'portals': [
                    {
                        action: 'hide',
                        fields: ['users', 'teams']
                    },
                    {
                        action: 'show',
                        fields: ['portals']
                    },
                    {
                        action: 'setRequired',
                        fields: ['portals']
                    },
                    {
                        action: 'setNotRequired',
                        fields: ['users', 'teams']
                    }
                ]
            },
            default: [
                {
                    action: 'hide',
                    fields: ['teams', 'users', 'portals']
                },
                {
                    action: 'setNotRequired',
                    fields: ['teams', 'users', 'portals']
                }
            ]
        }
    }

    setup() {
        super.setup();

        this.seed = this.model.clone();

        const optionList = ['self'];

        this.model.set('type', 'Post');
        this.model.set('targetType', 'self');

        const messagePermission = this.getAcl().getPermissionLevel('message');
        const portalPermission = this.getAcl().getPermissionLevel('portal');

        if (messagePermission === 'team' || messagePermission === 'all') {
            optionList.push('users');
            optionList.push('teams');
        }

        if (messagePermission === 'all') {
            optionList.push('all');
        }

        if (portalPermission === 'yes') {
            optionList.push('portals');

            if (!~optionList.indexOf('users')) {
                optionList.push('users');
            }
        }

        this.createField('targetType', 'views/fields/enum', {
            options: optionList,
        });

        this.createField('users', 'views/note/fields/users', {});
        this.createField('teams', 'views/fields/teams', {});
        this.createField('portals', 'views/fields/link-multiple', {});
        this.createField('post', 'views/note/fields/post', {
            required: true,
            rowsMin: 1,
            noResize: true,
        });

        this.createField('attachments', 'views/stream/fields/attachment-multiple', {});

        this.listenTo(this.model, 'change', () => {
            if (this.postingMode) {
                this.setConfirmLeaveOut(true);
            }
        });
    }

    disablePostingMode() {
        this.postingMode = false;

        this.$el.find('.post-control').addClass('hidden');

        this.setConfirmLeaveOut(false);

        $('body').off('click.stream-create-post');

        this.getFieldView('post').$element.prop('rows', 1);
    }

    enablePostingMode() {
        this.$el.find('.post-control').removeClass('hidden');

        if (!this.postingMode) {
            const $body = $('body');

            $body.off('click.stream-create-post');

            $body.on('click.stream-create-post', e => {
                if (
                    $.contains(window.document.body, e.target) &&
                    !$.contains(this.$el.get(0), e.target) &&
                    !$(e.target).closest('.modal-dialog').length
                ) {
                    if (this.getFieldView('post') && this.getFieldView('post').$element.val() === '') {
                        if (!(this.model.get('attachmentsIds') || []).length) {
                            this.disablePostingMode();
                        }
                    }
                }
            });
        }

        this.postingMode = true;
    }

    afterRender() {
        this.$postButton = this.$el.find('button.post');

        const postView = this.getFieldView('post');

        if (postView) {
            this.stopListening(postView, 'add-files');

            this.listenTo(postView, 'add-files', (files) => {
                this.enablePostingMode();

                const attachmentsView = /** @type module:views/fields/attachment-multiple */
                    this.getFieldView('attachments');

                if (!attachmentsView) {
                    return;
                }

                attachmentsView.uploadFiles(files);
            });
        }
    }

    validate() {
        let notValid = super.validate();

        const message = this.model.get('post') || '';

        if (message.trim() === '' && !(this.model.get('attachmentsIds') || []).length) {
            notValid = true;
        }

        return notValid;
    }

    post() {
        this.save();
    }

    beforeBeforeSave() {
        this.disablePostButton();
    }

    beforeSave() {
        Espo.Ui.notifyWait();
    }

    afterSave() {
        Espo.Ui.success(this.translate('Posted'));
    }

    afterNotValid() {
        this.enablePostButton();
    }

    disablePostButton() {
        this.trigger('disable-post-button');

        this.$postButton.addClass('disable').attr('disabled', 'disabled');
    }

    enablePostButton() {
        this.trigger('enable-post-button');

        this.$postButton.removeClass('disable').removeAttr('disabled');
    }
}

export default EditStreamView;
