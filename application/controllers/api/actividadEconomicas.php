<?php defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * Example
 *
 * This is an example of a few basic product interaction methods you could use
 * all done with a hardcoded array.
 *
 * @package		CodeIgniter
 * @subpackage	Rest Server
 * @category	Controller
 * @author		Phil Sturgeon
 * @link		http://philsturgeon.co.uk/code/
*/

// This can be removed if you use __autoload() in config.php OR use Modular Extensions
require APPPATH.'/libraries/REST_Controller.php';

class actividadEconomicas extends REST_Controller
{
	function __construct()
    {
        // Construct our parent class
        parent::__construct();
        $this->load->model('actividadEconomica','',TRUE);
    }

    function actividadEconomica_get()
    {
        $actividadEconomica = $this->actividadEconomica->getAll()->result();
        if ($actividadEconomica) {
            $this->response($actividadEconomica, 200);
        } else {
          	$this->response(array('error' => 'no se encontro el actividad Economica'), 404);
        }
    }

    function actividadEconomica_put()
  	{
	    try {
	       $id_actividadEconomica = $this->get('id_actividadEconomica');
	       $input_values = $this->put();
	       $item = $this->actividadEconomica->modifica($id_actividadEconomica, $input_values);
	       $this->response($item, 200);
	    } catch (Exception $e) {
	     $this->response(array("error" => $e->getMessage()), 404);
	    }
  	}

    function actividadEconomica_post() {
        $input = (array) json_decode(file_get_contents("php://input"));
        $product = $this->actividadEconomica->save($input);
        $this->response($product, 200);
    }

    function actividadEconomica_delete()
    {
        $id = $this->get('id_actividadEconomica');
        $this->actividadEconomica->delete($id);
        $this->response(array('param' => $id), 200);
    }

		function send_post()
		{
			var_dump($this->request->body);
		}
}
