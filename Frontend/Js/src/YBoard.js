import YQuery from './YQuery';
import Captcha from './YBoard/Captcha';
import Theme from './YBoard/Theme';
import Toast from './YBoard/Toast';
import Catalog from './YBoard/Catalog';
import Thread from './YBoard/Thread';
import Post from './YBoard/Post';
import PostForm from './YBoard/PostForm';
import Modal from './YBoard/Modal';
import Tooltip from './Tooltip';

class YBoard
{
    constructor()
    {
        let that = this;
        this.Catalog = new Catalog();
        this.Captcha = new Captcha();
        this.Theme = new Theme();
        this.Toast = new Toast();
        this.Thread = new Thread();
        this.Post = new Post();
        this.PostForm = new PostForm();
        this.Modal = new Modal();

        if (this.isBadBrowser()) {
            this.browserWarning();
        }

        document.addEventListener('keydown', function(e)
        {
            if (!e.ctrlKey && !e.shiftKey && e.which === 116 || e.ctrlKey && !e.shiftKey && e.which === 82) {
                // Make F5 || CTRL + R function like clicking links and thus not reloading everything
                // Maybe we can remove this completely one day.
                e.preventDefault();
                that.pageReload();
            }
            if (e.ctrlKey && e.which === 13) {
                // Submit the post form with CTRL + Enter
                that.PostForm.submit(e);
            }
        });

        YQuery.on('submit', 'form.ajax', function (event) {
            that.submitForm(event);
        });

        // Sidebar signup & login
        document.getElementById('login').querySelector('.signup').addEventListener('click', function(e)
        {
            that.signup(e, true);
        });
        document.getElementById('signup').querySelector('.cancel').addEventListener('click', function(e)
        {
            that.signup(e, false);
        });

        // Hide sidebar
        document.getElementById('sidebar-hide-button').addEventListener('click', function()
        {
            that.Theme.toggleSidebar();
        });

        // Go to top
        document.getElementById('scroll-to-top').addEventListener('click', function()
        {
            window.scrollTo(0, 0);
        });

        // Go to bottom
        document.getElementById('scroll-to-bottom').addEventListener('click', function()
        {
            window.scrollTo(0, document.body.scrollHeight);
        });

        // Reload page
        document.getElementById('reload-page').addEventListener('click', function()
        {
            that.pageReload()
        });

        this.initElement(document);
    }

    initElement(elm)
    {
        let that = this;

        // Localize dates, numbers and currencies
        elm.querySelectorAll('.datetime').forEach(this.localizeDatetime);
        elm.querySelectorAll('.number').forEach(this.localizeNumber);
        elm.querySelectorAll('.currency').forEach(this.localizeCurrency);

        elm.querySelectorAll('.tip, .ref').forEach(function(elm)
        {
            elm.addEventListener('mouseover', function(e)
            {
                let postId = null;
                if (typeof e.target.dataset.id !== 'undefined') {
                    postId = e.target.dataset.id;
                }
                new Tooltip(e, {
                    'openDelay': 100,
                    'position': 'bottom',
                    'content': that.spinnerHtml(),
                    'onOpen': function(tip)
                    {
                        YQuery.post('/api/post/get', {
                            'postId': postId,
                        }).onLoad(function(xhr)
                        {
                            tip.setContent(xhr.responseText);
                            tip.position();
                        }).onError(function(xhr)
                        {
                            tip.setContent(messages.errorOccurred);
                            tip.position();
                        });
                    },
                });
            });
        });
    }

    localizeDatetime(elm)
    {
        elm.innerHTML = new Date(elm.innerHTML.replace(' ', 'T') + 'Z').toLocaleString();
    }

    localizeNumber(elm)
    {
        elm.innerHTML = parseFloat(elm.innerHTML).toLocaleString();
    }

    localizeCurrency(elm, currency = 'eur')
    {
        elm.innerHTML = parseFloat(elm.innerHTML).toLocaleString('', {
            'style': 'currency',
            'currency': currency
        });
    }

    getSelectionText()
    {
        let text = '';
        if (window.getSelection) {
            text = window.getSelection().toString();
        } else {
            if (document.selection && document.selection.type !== 'Control') {
                text = document.selection.createRange().text;
            }
        }

        return text;
    }

    isBadBrowser()
    {
        if (typeof FormData !== 'function') {
            return true;
        }

        if (typeof localStorage !== 'object') {
            return true;
        }

        return false;
    }

    browserWarning()
    {
        let browserWarning = document.createElement('div');
        browserWarning.classList.add('old-browser-warning');
        browserWarning.innerHTML = '<p>' + messages.oldBrowserWarning + '</p>';

        document.body.appendChild(browserWarning);
    }

    pageReload()
    {
        window.location = window.location.href.split('#')[0];
    }

    returnToBoard()
    {
        // Remove everything after the last slash and redirect
        // Should work if we are in a thread, otherwise not really
        let url = window.location.href;
        url = url.substr(0, url.lastIndexOf('/') + 1);

        window.location = url;
    }

    spinnerHtml(classes = '')
    {
        if (classes !== '') {
            classes += ' ';
        }

        return '<span class="' + classes + 'loading icon-loading spin"></span>';
    }

    submitForm(e, form = false)
    {
        if (e !== null) {
            e.preventDefault();
            form = e.target;
        }

        if (form === false) {
            return false;
        }

        let fd = new FormData(form);

        let overlay = document.createElement('div');
        overlay.classList.add('form-overlay');
        overlay.innerHTML = '<div>' + this.spinnerHtml() + '</div></div>';
        form.append(overlay);

        YQuery.post(form.getAttribute('action'), fd).onLoad(function(data)
        {
            if (data.reload) {
                if (data.url) {
                    window.location = data.url;
                } else {
                    window.location.reload();
                }
            } else {
                overlay.remove();
                this.Toast.success(data.message);
                form.reset();
            }
        }).onError(function()
        {
            overlay.remove();
        });
    }

    signup(e, show)
    {
        let that = this;
        // Signup form in sidebar
        e.preventDefault();
        let elm = e.target;

        let loginForm = document.getElementById('login');
        let signupForm = document.getElementById('signup');

        if (show) {
            signupForm.show('flex');
            loginForm.hide();

            this.Captcha.render(signupForm.querySelector('.g-recaptcha'), {
                'size': 'invisible',
                'callback': function(response)
                {
                    that.submitForm(null, signupForm);
                }
            });
        } else {
            signupForm.hide();
            loginForm.show('flex');
        }
    }
}

export default new YBoard();
