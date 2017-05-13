<?php
namespace YBoard\Controllers\Cli;

use YBoard\Traits\JsTemplates;
use YFW\Controller;
use YFW\Library\i18n;

class GenerateFiles extends Controller
{
    protected $config;

    public function allJs()
    {
        $this->jsLocales();
        $this->jsConfig();
    }

    public function jsLocales()
    {
        $i18n = new i18n(ROOT_PATH . '/YBoard/Locales');

        $outPath = ROOT_PATH . '/static/js/locales';
        if (!is_dir($outPath)) {
            mkdir($outPath, 0774, true);
        }

        foreach ($i18n->listLocales() as $locale => $domains) {
            foreach ($domains as $domain) {
                $i18n->loadLocale($locale, $domain);

                $outFile = $outPath . '/' . $locale . '.' . $domain . '.js';
                file_put_contents($outFile, $this->getJsMessages());
                echo 'Generated: ' . $locale . '.' . $domain . "\n";
            }
        }
    }

    public function jsConfig()
    {
        // Load config
        $this->config = require(ROOT_PATH . '/YBoard/Config/App.php');

        $outPath = ROOT_PATH . '/static/js';
        if (!is_dir($outPath)) {
            mkdir($outPath, 0774, true);
        }

        file_put_contents($outPath . '/config.js', $this->getJsConfig());
        echo "JS config file generated\n";
    }

    protected function getJsMessages()
    {
        $messages = [
            'loading' => _('Loading...'),
            'undo' => _('Undo'),
            'errorOccurred' => _('An error occurred'),
            'timeoutWarning' => _('Loading timed out – please check your internet connection'),
            'networkError' => _('Network error – please check that you are connected to the internet'),
            'logOutConfirm' => _('Log out?'),
            'signUp' => _('Sign up'),
            'cancel' => _('Cancel'),
            'logIn' => _('Log_in'),
            'maxSizeExceeded' => _('Your files exceed the maximum upload size.'),
            'confirmDeletePost' => _('Delete post?'),
            'confirmDeleteFile' => _('Delete file?'),
            'postSent' => _('Post sent'),
            'postDeleted' => _('Post deleted'),
            'fileDeleted' => _('File deleted'),
            'postReported' => _('Post reported'),
            'threadHidden' => _('Thread hidden'),
            'threadRestored' => _('Thread restored'),
            'threadLocked' => _('Thread locked'),
            'threadUnlocked' => _('Thread unlocked'),
            'threadStickied' => _('Thread stickied'),
            'threadUnstickied' => _('Thread unstickied'),
            'reportCleared' => _('Report cleared'),
            'banAdded' => _('Ban added'),
            'confirmUnload' => _('Your message will be lost.'),
            'noNewReplies' => _('No new replies'),
            'showFullMessage' => _('show full message'),
            'passwordsDoNotMatch' => _('The two passwords do not match'),
            'passwordChanged' => _('Password changed'),
            'oldBrowserWarning' => _('You are using an outdated browser which does not support some modern techniques used by this website. Please upgrade your browser.'),
        ];

        return 'let messages=' . json_encode($messages);
    }

    protected function getJsConfig()
    {
        $config = [
            'staticUrl' => $this->config['view']['staticUrl'],
        ];

        if ($this->config['reCaptcha']['enabled']) {
            $config['reCaptchaPublicKey'] = $this->config['reCaptcha']['publicKey'];
        }

        return 'let config=' . json_encode($config);
    }
}