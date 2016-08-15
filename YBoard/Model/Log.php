<?php
namespace YBoard\Model;

use YBoard\Model;

class Log extends Model
{
    const ACTION_ID_MOD_LOGIN = 1;
    const ACTION_ID_MOD_POST_DELETE = 2;
    const ACTION_ID_MOD_POST_FILE_DELETE = 3;
    const ACTION_ID_MOD_ADD_BAN = 4;
    const ACTION_ID_MOD_REPORT_CHECKED = 5;

    public function write(int $actionId, int $userId, $customData = null) : bool
    {
        $q = $this->db->prepare("INSERT INTO log (action_id, user_id, custom_data, ip)
            VALUES (:action_id, :user_id, :custom_data, :ip)");
        $q->bindValue('action_id', $actionId);
        $q->bindValue('user_id', $userId);
        $q->bindValue('custom_data', $customData);
        $q->bindValue('ip', inet_pton($_SERVER['REMOTE_ADDR']));
        $q->execute();

        return true;
    }

    public function getActionTitle(int $actionId)
    {
        switch ($actionId) {
            case static::ACTION_ID_MOD_LOGIN:
                return _('Moderator logged in');
            case static::ACTION_ID_MOD_POST_DELETE:
                return _('Deleted a post');
            case static::ACTION_ID_MOD_POST_FILE_DELETE:
                return _('Deleted a file from a post');
            case static::ACTION_ID_MOD_ADD_BAN:
                return _('Added a ban');
            case static::ACTION_ID_MOD_REPORT_CHECKED:
                return _('Checked a report');
        }
    }
}
