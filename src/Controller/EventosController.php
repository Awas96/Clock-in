<?php

namespace App\Controller;

use App\Entity\Evento;
use App\Entity\Turno;
use App\Repository\EventoRepository;
use App\Repository\UsuarioRepository;
use Datetime;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/eventos", name="eventos_")
 */
class EventosController extends AbstractController
{
    /**
     * @Route("/gestionaHorarios", name="gestiona_horarios")
     */
    public function base(UsuarioRepository $usuarioRepository): Response
    {
        $usuarios = $usuarioRepository->findAll();
        return $this->render('eventos/base.html.twig', [
            'usuarios' => $usuarios,
            'controller_name' => 'EventosController',
        ]);
    }

    /**
     * @Route("/gestionaHorarios/leer", name="gestiona_horarios_leer")
     */
    public function recoger(EventoRepository $eventoRepository): Response
    {
        //recoger solo los eventos que nos interesan
        $predefinidos = $predefinidosRepository->findAll();
        $horarios = array();

        foreach ($predefinidos as $horario) {

            array_push($horarios, ["id" => $horario->getId(), "entrada" => $horario->getHoraInicio()->format("H.i"), "salida" => $horario->getHoraFin()->format("H.i")]);
        }
        dump($horarios);
        return new JsonResponse($horarios);
    }

    /**
     * @Route("/gestionaHorarios/agregar", name="gestiona_horarios_agregar")
     */
    public function agregar(Request $request, UsuarioRepository $usuarioRepository, Evento $evento = null, Turno $turno = null): Response
    {
        if ($request->isXMLHttpRequest()) {
            $content = $request->getContent();
            if (!empty($content)) {
                $params = json_decode($content, true);
                if ($params["tipo"] == "Turno") {

                    $id = $params["id"];
                    $fecha = new Datetime(date('Y-m-d', strtotime($params["fecha"])));
                    $inicio = new Datetime(date('H:i', strtotime($params['inicio'])));
                    $fin = new Datetime(date('H:i', strtotime($params['fin'])));
                    $em = $this->getDoctrine()->getManager();
                    $evento = new Evento();
                    $evento->setFecha($fecha);
                    $evento->setUsuario($usuarioRepository->findByID($id));
                    $em->persist($evento);
                    $em->flush();
                    $turno = new Turno();
                    $turno->setHoraInicio($inicio);
                    $turno->setHoraFin($fin);
                    $turno->setEvento($evento);
                    dump($evento);
                    dump($turno);
                    $em->persist($evento);
                    $em->persist($turno);
                    $em->flush();
                }
            }
            return new JsonResponse("YESSSS");
        }
        return new Response('Error!', 400);
    }
}
